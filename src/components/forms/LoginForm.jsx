"use client";
import React from 'react'
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import styles from "@/components/forms/LoginForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";

function LoginForm({ setIsSingUp }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // 🔹 仮のユーザー情報（本番ではバックエンドと連携）
    const userData = {
      id: 1,
      name: "John Doe",
      email: data.email,
    };
    dispatch(login(userData));
    console.log("User logged in:", userData);
    reset()
  };

  const handleIsSingUp = () => {
    setIsSingUp(true)
  }

  return (
    <div className={formStyles.formContainer}>
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          <h2 className={`h2 ${formStyles.formH2}`}>Login</h2>
          <div className={`${styles.loginArea} grid `}>
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
            {/* LOGIN BUTTON */}
            <button type='submit' className={`btnLg ${formStyles.formBtn}`}>
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>

          {/* LINKS */}
          <ul className={`${formStyles.ul}`}>
            <li className={`${formStyles.li}`}>
              <button className={formStyles.link} onClick={handleIsSingUp}>Create Account</button>
              {/* Need change href="#" */}
            </li>
            <li className={`${formStyles.li}`}>
              <button className={formStyles.link} href="#">Forget Password</button>
              {/* Need change href="#" */}
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default LoginForm