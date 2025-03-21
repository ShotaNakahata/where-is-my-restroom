"use client"
import React, { useState } from 'react'
import styles from "@/components/common/LoginModal.module.css";
import modalStyles from "@/components/common/Modal.module.css";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";



  function LoginModal({onCloseIsModal}) {
    const [isSingUp, setIsSingUp] = useState(null);
    return (
      <div className={modalStyles.modalOverlay}>
        <div className={`${modalStyles.modalContent} ${styles.loginModalContent}`}>

          {isSingUp
            ? <SignupForm setIsSingUp={setIsSingUp} isModal={true} onCloseIsModal={onCloseIsModal} alert="Please log in to add this toilet to your favorites." />
            : <LoginForm setIsSingUp={setIsSingUp} isModal={true} onCloseIsModal={onCloseIsModal} alert="Please log in to add this toilet to your favorites." />
          }

          {/* <h2 className={modalStyles.modalH2}>{message}</h2>
        <p className={modalStyles.description}>{description}</p> */}
          {/* <button onClick={() => onClose()} className={`${modalStyles.ModalBtn} btnLg`}>Close</button> */}
        </div>
      </div>
    )
  }

export default LoginModal