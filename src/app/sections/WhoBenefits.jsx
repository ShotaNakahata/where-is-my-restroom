import React from 'react'
import styles from "./WhoBenefits.module.css";
import Image from "next/image";
const benefits = [
  {
    id: 1,
    imgSrc: "/benefitsImg/customer-1.jpg",
    imgAlt: "Clean restroom",
    subheading: "For People Who Want Clean & Convenient Restrooms",
    text: "Not all restrooms are clean. This app helps you find well-rated, regularly cleaned facilities nearby."
  },
  {
    id: 2,
    imgSrc: "/benefitsImg/customer-2.jpg",
    imgAlt: "Accessible restroom",
    subheading: "For Individuals with Disabilities",
    text: "Finding a wheelchair-friendly restroom can be hard. This app helps you locate accessible facilities easily."
  },
  {
    id: 3,
    imgSrc: "/benefitsImg/customer-3.jpg",
    imgAlt: "Parents with kids",
    subheading: "For Parents & Expecting Mothers",
    text: "Finding a restroom quickly with kids is essential. This app makes locating family-friendly restrooms easy."
  },
  {
    id: 4,
    imgSrc: "/benefitsImg/customer-4.jpg",
    imgAlt: "Tourist searching for restroom",
    subheading: "Finding a Restroom in a Foreign City Can Be Stressful",
    text: "Tourists often struggle to find restrooms. This app helps you locate clean facilities wherever you go."
  }
];


function WhoBenefits() {
  return (
    <section className={`${styles.whoBenefits} sectionP centerText`}>
      <div className={`container`}>
        <span className={`subheading`}>For everyone, everywhere</span>
        <h2 className={`h2`}>Who Can Benefit from This App?</h2>
        <div className={`${styles.benefitsList} grid grid1col`}>
          {benefits.map((benefit) => {
            return (
              <div key={benefit.id} className={styles.benefit}>
                <div className={styles.benefitsImgBox}>
                  <Image className={styles.img} src={benefit.imgSrc} width="100" height="100" alt={benefit.imgAlt} />
                </div>
                <div className={styles.benefitsTextBox}>
                  <span className={`subheading ${styles.benefitSubheading}`}>{benefit.subheading}</span>
                  <blockquote className={styles.blockquote}>{benefit.text}</blockquote>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoBenefits