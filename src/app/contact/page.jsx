"use client"
import React, { useState } from 'react'
import styles from "@/app/contact/contact.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";
import Image from "next/image";

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  const [status, setStatus] = useState("");
  const onSubmit = async (data) => {
    console.log("form row data", data)
    setStatus("Form now sending...")
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setStatus("succece!");
        reset()
      } else {
        setStatus("error occured");
      }
    } catch (error) {
      console.log("error occured", error);
      setStatus("error occured")
    }
  };
  return (
    <main className={`${styles.contactPage}`}>
      <div className={styles.textBox}>
        <h2 className={styles.contactH2}>Contact</h2>
        <p className={styles.description}>We’d love to hear from you! Please fill out the form below to get in touch with us. Whether you have a question, feedback, or just want to say hi, we’re here to help.</p>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.imgBox}>
          <Image src="/hero.png" className={styles.contactImg} alt='contact img' width="290" height="286" />
        </div>
        <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${formStyles.formContents} `}>
            {/* <h2 className={`h2 ${formStyles.formH2}`}>Contact</h2> */}
            <div className={`${styles.loginArea} grid `}>
              {/* EMAIL */}
              <div className={formStyles.formContent}>
                <label className={formStyles.label} htmlFor="email">Email</label>
                <input {...register("email", validationRules.email)} className={formStyles.input} type="email" placeholder='me@example.com' />
                {errors.email ? <span className={formStyles.error}>{errors.email.message}</span> : <span className={formStyles.errorsDefo}>*must include @</span>}
              </div>
              {/* SUBJECT */}
              <div className={formStyles.formContent}>
                <label className={formStyles.label} htmlFor="subject">Subject</label>
                <input {...register("subject", validationRules.requiredField)} className={formStyles.input} type="text" placeholder='Subject' />
                {errors.subject ? <span className={formStyles.error}>{errors.subject.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
              </div>
              {/* MESSASGE */}
              <div className={formStyles.formContent}>
                <label className={formStyles.label} htmlFor="message">Message</label>
                <textarea {...register("message", validationRules.requiredField)} className={formStyles.input} type="text" placeholder='Message' />
                {errors.message ? <span className={formStyles.error}>{errors.message.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
              </div>
              {/* LOGIN BUTTON */}
              <button type='submit' className={`btnLg ${formStyles.formBtn}`}>
                {isSubmitting ? "Submitting..." : "Send"}
              </button>
              {status && <p>{status}</p>}
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ContactPage