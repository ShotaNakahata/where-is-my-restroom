"use client";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import styles from "@/components/forms/LoginForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";

const modalConfig = {
  success: {
    message: "Login Success!",
    description: "You're in! Start exploring now.",
    btnMessage: "close",
  },
  error: {
    message: "Login Faild",
    description: null,
    btnMessage: "close",
  }
}

function LoginForm({ setIsSingUp, alert = null, isModal = false ,onCloseIsModal}) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(login(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));
        setModalData(modalConfig.success);
        reset();
      } else {
        setErrorMessage(result.error || "Login failed");
        modalConfig.error.description = result.error || "Login failed"
        setModalData(modalConfig.error);
      }
    } catch (error) {
      modalConfig.error.description = "Something went wrong. Please try again."
      setModalData(modalConfig.error);
    }
    setisModalOpen(true);
  };

  const handleIsSingUp = () => {
    setIsSingUp(true)
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
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => allModalClose()}/>}
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          {isModal && <div className={`${formStyles.closeIcon}`} onClick={() => onCloseIsModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${formStyles.icon} ${formStyles.fixedIcon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}
          <h2 className={`h2 ${formStyles.formH2}`}>Login</h2>
          {alert && <p className={styles.alert}>{alert}</p>}
          <div className={`${styles.loginArea} grid `}>
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
              <button className={formStyles.link} onClick={handleIsSingUp}>Create Account</button>
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

export default LoginForm