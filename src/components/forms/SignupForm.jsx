"use client";
import React, { useState } from 'react'
import styles from "@/components/forms/SignupForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "@/redux/slices/authSlice";
import Modal from "@/components/common/Modal";

const modalConfig = {
  success: {
    message: "Singup Success!",
    description: "You can now save and review restrooms.",
    btnMessage: "close",
  },
  error: {
    message: "Login Faild",
    description: null,
    btnMessage: "close",
  }
}
function SignupForm({ setIsSingUp, alert = null, isModal = false, onCloseIsModal }) {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch();
  // const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result: ", result);
        dispatch(signup(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));
        setModalData(modalConfig.success);
        reset()
        setIsSingUp(false)
      } else {
        const result = await result.json().catch(() => ({ error: "Something went wrong" }));
        setModalData({ ...modalConfig.error, description: result.error || "Login failed" });
      }
    } catch (error) {
      setModalData({ ...modalConfig.error, description: result.error || "Login failed" });
    }
    setisModalOpen(true);
  }
  const handleIsSingUp = () => {
    setIsSingUp(false)
  }
  const allModalClose = () => {
    if(isModal){
      setisModalOpen(false);
      onCloseIsModal()
    }else{
      setisModalOpen(false);
    }
  }

  return (
    <div className={formStyles.formContainer}>
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => allModalClose()} />}
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          {isModal && <div className={`${formStyles.closeIcon}`} onClick={() => onCloseIsModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${formStyles.icon} ${formStyles.fixedIcon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}
          <h2 className={`h2 ${formStyles.formH2}`}>Signup Form</h2>
          {alert && <p className={styles.alert}>{alert}</p>}
          <div className={`${styles.singupArea} grid`}>
            {/* USER NAME */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="name">UserName</label>
              <input className={formStyles.input} {...register("name", validationRules.name)} type="text" placeholder='John' />
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
              <button onClick={handleIsSingUp} className={formStyles.link}>Login</button>
              {/* Need change href="#" */}
            </li>
            <li className={`${formStyles.li}`}>
              <button className={formStyles.link} href="#">Forget Password</button>{/* Need made this feature */}
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default SignupForm