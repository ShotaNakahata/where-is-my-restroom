import React from 'react'
import styles from "@/components/forms/LoginForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import Link from "next/link";

function LoginForm() {
  return (
    <div className={styles.loginForm}>
      <div className={styles.loginFormContents}>
        <h2 className={`h2`}>Login</h2>
        <div className={`${styles.loginInput} grid grid1col`}>
          <div className={formStyles.formContent}>
            <label htmlFor="email">Email</label>
            <input  name='email' type="email" placeholder='Email'/>
          </div>
          <div className={formStyles.formContent}>
            <label htmlFor="password">Password</label>
            <input  name='password' type="email" placeholder='Password'/>
          </div>
          <button className={`btnLg ${formStyles.formBtn}`}>
            Login
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
    </div>
  )
}
// nextまたはreact queryにあったformを使用するように変更
export default LoginForm