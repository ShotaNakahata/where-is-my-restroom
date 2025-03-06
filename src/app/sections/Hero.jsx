import React from 'react'
import Image from "next/image";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroTextBox}>
          <h1 className={`h1`}></h1>
          <div className={btnBox}>
            <button className={`btn`}></button>
            <button className={`btn`}></button>
            <button className={`btn`}></button>
          </div>
        </div>
        <div className={styles.heroImgBox}>
          <Image src="/hero-img-sample.jpeg" className={styles.heroImg} alt='hero img'/>
        </div>
      </div>
    </section>
  )
}

export default Hero