"use client"
import React from 'react'
import ToiletForm from "@/components/forms/ToiletForm";
import styles from "@/app/toilet/add/toiletAdd.module.css";
import Image from "next/image";

function page() {
  return (
    <main className={styles.addPage}>
      <div className={styles.textBox}>
        <h2 className={styles.addH2}>Register New Restroom</h2>
        <p className={styles.description}>We’d love to hear from you! Please fill out the form below to get in touch with us. Whether you have a question, feedback, or just want to say hi, we’re here to help.</p>
      </div>
      <div className={styles.addContainer}>
        <div className={styles.imgBox}>
          <div className={styles.imageWrapper}>
            <Image src="/addToilet/addToiletImg.webp" className={styles.addImg} alt='contact img' fill />
          </div>
        </div>
        <div className={styles.form}>
          {/* <div className={styles.imgBox}>
            <div className={styles.imageWrapper}>
              <Image src="/addToilet/addToiletImg.webp" className={styles.addImg} alt='contact img'  width="300" height="400" />
            </div>
          </div> */}
          <ToiletForm />
        </div>
      </div>
    </main>
  )
}

export default page