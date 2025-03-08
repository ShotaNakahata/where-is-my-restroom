"use client"
import React, { useState } from 'react'
import LoginForm from "@/components/forms/LoginForm";
import styles from "@/app/sections/LoginSection.module.css";
import SignupForm from "@/components/forms/SignupForm";

function LoginSection() {
  const [isSingUp, setIsSingUp] = useState(false);
  return (
    <section className={`${styles.LoginForm} sectionP`}>
      <div className={`container`}>
        {isSingUp ? <SignupForm setIsSingUp={setIsSingUp}/> : <LoginForm setIsSingUp={setIsSingUp}/>}
      </div>
    </section>
  )
}

export default LoginSection