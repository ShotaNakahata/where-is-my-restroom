import React from 'react'
import styles from "@/components/common/Modal.module.css";

function Modal({ message, description, btnMessage, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalH2}>{message}</h2>
        <p className={styles.description}>{description}</p>
        <button onClick={() => onClose()} className={`${styles.ModalBtn} btnLg`}>{btnMessage}</button>
      </div>
    </div>
  )
}

export default Modal