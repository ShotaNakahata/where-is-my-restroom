import React from 'react'
import styles from "./WhoBenefits.module.css";
import Image from "next/image";

const benefits = [
  {
    id: 1,
    imgSrc: "/benefits/customer-1.webp",
    imgAlt: "Face of a young person looking for a clean restroom",
    subheading: "For People Who Want Clean & Convenient Restrooms",
    text: "Not all restrooms are clean. This app helps you find well-rated, regularly cleaned facilities nearby."
  },
  {
    id: 2,
    imgSrc: "/benefits/customer-2.webp",
    imgAlt: "Face of a wheelchair user looking for an accessible restroom",
    subheading: "For Individuals with Disabilities",
    text: "Finding a wheelchair-friendly restroom can be hard. This app helps you locate accessible facilities easily."
  },
  {
    id: 3,
    imgSrc: "/benefits/customer-3.webp",
    imgAlt: "Face of a young parent looking for a family-friendly restroom",
    subheading: "For Parents & Expecting Mothers",
    text: "Finding a restroom quickly with kids is essential. This app makes locating family-friendly restrooms easy."
  },
  {
    id: 4,
    imgSrc: "/benefits/customer-4.webp",
    imgAlt: "Face of a tourist searching for a restroom in a foreign city",
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
        <div className={`${styles.benefitsList} grid`}>
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