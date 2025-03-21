"use client"
import React, { useState } from 'react'
import styles from "@/components/common/LoginModal.module.css";
import modalStyles from "@/components/common/Modal.module.css";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";



  function LoginModal({onCloseIsModal,alert}) {
    const [isSingUp, setIsSingUp] = useState(null);
    return (
      <div className={modalStyles.modalOverlay}>
        <div className={`${modalStyles.modalContent} ${styles.loginModalContent}`}>
          {isSingUp
            ? <SignupForm setIsSingUp={setIsSingUp} isModal={true} onCloseIsModal={onCloseIsModal} alert={alert} />
            : <LoginForm setIsSingUp={setIsSingUp} isModal={true} onCloseIsModal={onCloseIsModal} alert={alert}/>
          }
        </div>
      </div>
    )
  }

export default LoginModal