"use client";
import React from 'react'
import styles from "@/components/forms/SignupForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";

function SignupForm({setIsSingUp}) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })

  // 後々ログイン機能を実装
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // ✅ 2秒待機
    console.log("onSubmit", data);
  };
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
              <input className={formStyles.input} {...register("name", validationRules.email)} type="email" placeholder='John' />
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
          </div>
          {/* LINKS */}
          <ul className={`${formStyles.ul}`}>
            <li className={`${formStyles.li}`}>
              <button onClick={handleIsSingUp} className={formStyles.link} href="#">Login</button>
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
// confirm
export default SignupForm