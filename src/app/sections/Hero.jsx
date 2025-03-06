import React from 'react'
import Image from "next/image";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`${styles.hero} grid`}>
        <div className={styles.heroTextBox}>
          <h1 className={`h1`}>
            Enjoy a hassle-free toilet experience wherever you go!
          </h1>
          <p className={styles.heroDescription}>
            This website allows you to easily find nearby Restrooms and detailed information.
            Accessible options are also available, making it convenient
            for those who need special facilities.
          </p>
          <div className={styles.btnBox}>
            <button className={`btn`}>View list</button>
            <button className={`btn`}>View list</button>
            <button className={`btn`}>View list</button>
          </div>
        </div>
        <div className={styles.heroImgBox}>
          <Image src="/hero-img-sample.png" className={styles.heroImg} alt='hero img' width="90" height="68" />
        </div>
      </div>
    </section>
  )
}

export default Hero