import React from 'react'
import Image from "next/image";
import styles from "./How.module.css";

export default function How() {
  return (
    <section className={styles.sectionHow}>
      <div className={`container`}>
        <span className="subheading">How it works</span>
        <h2 className="h2">
          Your daily dose of health in 3 simple steps
        </h2>
      </div>

      <div className={`container`}>
        
        <div className={styles.featureImgBox}>
          <Image src="/app-screen-1.png" width="100" height="200" alt="iPhone app
            preferences selection screen"/>
        </div>

        <div className={styles.featureTextBox}>
          <p className={styles.featureNum}>01</p>
          <h3 className={styles.featureTertiary}>
            Tell us what you like (and what not)
          </h3>
          <p className={styles.featureDesc}>
            Never again waste time thinking about what to eat! Omnifood AI
            will create a 100% personalized weekly meal plan just for you. It
            makes sure you get all the nutrients and vitamins you need, no
            matter what diet you follow!
          </p>
        </div>
      </div>
    </section>
  )
}
