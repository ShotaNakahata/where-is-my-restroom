"use client";
import React, { useState } from 'react'
import styles from "@/components/forms/SignupForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "@/redux/slices/authSlice";

function SignupForm({ setIsSingUp }) {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  // 後々ログイン機能を実装
  // const onSubmit = async (data) => {
  //   const newUser = {
  //     id: Date.now(),
  //     name: data.name,
  //     email: data.email,
  //     password: data.password
  //   }
  //   dispatch(singup(newUser));
  //   localStorage.setItem("user", JSON.stringify(newUser));
  //   console.log("User signed up:", newUser);
  //   reset();
  // };
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result: ", result);
        dispatch(signup(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));
        reset()
        setIsSingUp(false)
      } else {
        const errorResult = await result.json().catch(() => ({ error: "Something went wrong" }));
        setErrorMessage(errorResult);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }
  const handleIsSingUp = () => {
    setIsSingUp(false)
  }

  return (
    <div className={formStyles.formContainer}>
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          <h2 className={`h2 ${formStyles.formH2}`}>Signup Form</h2>
          <div className={`${styles.singupArea} grid`}>
            {/* USER NAME */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="name">UserName</label>
              <input className={formStyles.input} {...register("name", validationRules.name)} type="text" placeholder='John' />
              {errors.name ? <span className={`${formStyles.error} ${styles.minusMb}`}>{errors.name.message}</span> : <span className={`${formStyles.errorsDefo} ${styles.minusMb}`}>-</span>}
            </div>
            {/* EMAIL */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="email">Email</label>
              <input className={formStyles.input} {...register("email", validationRules.email)} type="email" placeholder='me@example.com' />
              {errors.email ? <span className={formStyles.error}>{errors.email.message}</span> : <span className={formStyles.errorsDefo}>*must include @</span>}
            </div>
            {/* PASSWORD */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="password">Password</label>
              <input className={formStyles.input} {...register("password", validationRules.password)} type="password" placeholder='Password' />
              {errors.password ? <span className={formStyles.error}>{errors.password.message}</span> : <span className={formStyles.errorsDefo}>*at least 6 characters</span>}
            </div>
            {/*CONFIRM PASSWORD */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={formStyles.input}
                {...register("confirmPassword", validationRules.confirmPassword(watch))}
                type="password"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword ? <span className={`${formStyles.error} ${styles.minusMb}`}>{errors.confirmPassword.message}</span> : <span className={`${formStyles.errorsDefo} ${styles.minusMb}`}>-</span>}
            </div>
            {/* LOGIN BUTTON */}
            <button type='submit' className={`btnLg ${styles.formBtn}`}>
              {isSubmitting ? "Submitting..." : "Signup"}
            </button>
            {errorMessage && <p className={formStyles.error}>{errorMessage}</p>}
          </div>
          {/* LINKS */}
          <ul className={`${formStyles.ul}`}>
            <li className={`${formStyles.li}`}>
              <button onClick={handleIsSingUp} className={formStyles.link}>Login</button>
              {/* Need change href="#" */}
            </li>
            <li className={`${formStyles.li}`}>
              <button className={formStyles.link} href="#">Forget Password</button>{/* Need made this feature */}
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default SignupForm