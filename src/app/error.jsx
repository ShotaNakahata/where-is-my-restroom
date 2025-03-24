"use client";
import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("🔴 Error occurred:", error);
  }, [error]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.description}>Please try again later.</p>
        <button className={styles.button} onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </div>
  );
}
