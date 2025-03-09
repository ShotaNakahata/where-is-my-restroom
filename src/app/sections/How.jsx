import React from 'react'
import Image from "next/image";
import styles from "./How.module.css";

const steps = [
  {
    id: 1,
    imgSrc: "/app-screen-1.png",
    title: "Tell us what you like (and what not)",
    description:
      "Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!",
  },
  {
    id: 2,
    imgSrc: "/app-screen-1.png",
    title: "Tell us what you like (and what not)",
    description:
      "Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!",
  },
  {
    id: 3,
    imgSrc: "/app-screen-1.png",
    title: "Tell us what you like (and what not)",
    description:
      "Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!",
  },
  {
    id: 4,
    imgSrc: "/app-screen-1.png",
    title: "Tell us what you like (and what not)",
    description:
      "Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!",
  },
]
export default function How() {
  return (
    <section className={`${styles.sectionHow} sectionP`}>
      <div className={`container`}>
        <span className="subheading">How it works</span>
        <h2 className={`h2 ${styles.mr}`}>
          Your daily dose of health in 3 simple steps
        </h2>
      </div>
      <div className={`container grid grid1col`}>
        {steps.map((step) => {
          return (
            <div key={step.id} className={styles.stepContainer}>
              <div className={styles.featureImgBox}>
                <Image className={styles.img} src={step.imgSrc} width="100" height="200" alt={step.title} />
              </div>
              <div className={styles.featureTextBox}>
                <p className={styles.featureNum}>{`0${step.id}`}</p>
                <h3 className={styles.featureTertiary}>{step.title}</h3>
                <p className={styles.featureDesc}>{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
