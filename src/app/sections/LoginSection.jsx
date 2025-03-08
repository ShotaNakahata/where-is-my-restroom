import React from 'react'
import LoginForm from "@/components/forms/LoginForm";
import styles from "@/app/sections/LoginSection.module.css";
import SignupForm from "@/components/forms/SignupForm";

function LoginSection() {
  return (
    <section className={`${styles.LoginForm} sectionP`}>
      <div className={`container`}>
        <SignupForm/>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginSection