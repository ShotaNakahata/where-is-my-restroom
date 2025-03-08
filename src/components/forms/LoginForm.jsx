"use client";
import React from 'react'
import styles from "@/components/forms/LoginForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import Link from "next/link";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })

  // 後々ログイン機能を実装
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // ✅ 2秒待機
    console.log("onSubmit", data);
  };

  return (
    <div className={formStyles.formContainer}>
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          <h2 className={`h2 ${formStyles.formH2}`}>Login</h2>
          <div className={`${styles.loginArea} grid grid1col`}>
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
              <Link className={formStyles.link} href="#">Create Account</Link>
              {/* Need change href="#" */}
            </li>
            <li className={`${formStyles.li}`}>
              <Link className={formStyles.link} href="#">Forget Password</Link>
              {/* Need change href="#" */}
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default LoginForm