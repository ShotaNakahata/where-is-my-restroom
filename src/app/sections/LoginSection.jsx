import React from 'react'
import LoginForm from "@/components/forms/LoginForm";
import styles from "@/app/sections/LoginSection.module.css";

function LoginSection() {
  return (
    <section className={styles.LoginForm}>
      <LoginForm />
    </section>
  )
}

export default LoginSection