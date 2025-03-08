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
    <form className={`${styles.loginForm} box`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.loginFormContents} `}>
        <h2 className={`h2 ${styles.loginFormH2}`}>Login</h2>
        <div className={`${styles.loginInput} grid grid1col`}>

          <div className={styles.formContent}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} {...register("email", validationRules.email)} type="email" placeholder='me@example.com' />
            {errors.email?<span className={styles.error}>{errors.email.message}</span>:<span className={styles.errorsDefo}>*must include @</span>}
          </div>

          <div className={styles.formContent}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} {...register("password", validationRules.password)} type="password" placeholder='Password (at least 6 characters)' />
            {errors.password?<span className={styles.error}>{errors.password.message}</span>:<span className={styles.errorsDefo}>*at least 6 characters</span>}
          </div>
          <button type='submit' className={`btnLg ${styles.formBtn}`}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
          <ul className={`${styles.ul}`}>
            <li className={`${styles.li}`}>
              <Link className={styles.link} href="#">Create Account</Link>
              {/* Need change href="#" */}
            </li>
            <li className={`${styles.li}`}>
              <Link className={styles.link} href="#">Forget Password</Link>
              {/* Need change href="#" */}
            </li>
          </ul>
      </div>
    </form>
  )
}

export default LoginForm