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
          This website helps you quickly find nearby restrooms and key details. Accessible options make it convenient for those needing special facilities.Ï
          </p>
          <div className={styles.btnBox}>
            <button className={`btnLg`}>View list</button>
            <button className={`btnLg`}>View list</button>
            <button className={`btnLg`}>View list</button>
          </div>
        </div>
        <div className={styles.heroImgBox}>
          <Image src="/hero.png" className={styles.heroImg} alt='hero img' width="290" height="286" />
        </div>
      </div>
    </section>
  )
}

export default Hero