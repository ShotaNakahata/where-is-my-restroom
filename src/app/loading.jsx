import React from 'react'
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
}
