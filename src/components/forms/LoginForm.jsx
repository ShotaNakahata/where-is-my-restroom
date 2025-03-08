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
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.loginFormContents}>
        <h2 className={`h2`}>Login</h2>
        <div className={`${styles.loginInput} grid grid1col`}>
          <div className={formStyles.formContent}>
            <label htmlFor="email">Email</label>
            <input {...register("email", validationRules.email)} type="email" placeholder='Email' />
            {errors.email&&<span className={formStyles.error}>{errors.email.message}</span>}
          </div>
          <div className={formStyles.formContent}>
            <label htmlFor="password">Password</label>
            <input {...register("password", validationRules.password)} type="password" placeholder='Password' />
            {errors.password&&<span className={formStyles.error}>{errors.password.message}</span>}
          </div>
          <button type='submit' className={`btnLg ${formStyles.formBtn}`}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          <ul>
            <li>
              <Link href="#">Create Account</Link>
              {/* Need change href="#" */}
            </li>
            <li>
              <Link href="#">Forget Password</Link>
              {/* Need change href="#" */}
            </li>
          </ul>
          <Link href="#">Return to Home</Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm