import React from 'react'
import Image from "next/image";
import styles from "./How.module.css";

const steps = [
  {
    id: 1,
    imgSrc: "/howItWorks/map.webp",
    keyword: "Map",
    title: " Find Restrooms Easily",
    description:
      "Share your location to quickly find nearby restrooms. Accessible restrooms are shown in blue, and regular restrooms in red, helping you efficiently locate the best restroom based on your needs.",
  },
  {
    id: 2,
    imgSrc: "/howItWorks/list.webp",
    keyword: "List",
    title: " Filter & Find Restrooms Easily",
    description:
      "Search for restrooms in a list format. Use filters to find Accessible, Top Rated, or Nearby restrooms quickly and easily.",
  },
  {
    id: 3,
    imgSrc: "/howItWorks/bookmark.webp",
    keyword: "Bookmark",
    title: " Save & Access Your Favorite Toilets",
    description:
      "Save your favorite restrooms and manage them on My Page. With bookmarks, you can quickly find the toilets you like whenever you need them!",
  },
  {
    id: 4,
    imgSrc: "/howItWorks/rating.webp",
    keyword: "Rate",
    title: " Find the Best Restrooms with Reviews & Ratings",
    description:
      "Check ratings and share your experience to help others find the cleanest and best-equipped restrooms. See user comments for more reliability, making it easier to find a restroom that meets your needs!",
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
      <div className={`container grid ${styles.howContents}`}>
        {steps.map((step) => {
          return (
            <div key={step.id} className={styles.stepContainer}>
              <div className={styles.imgBg}>
                <div className={styles.featureImgBox}>
                  <Image className={styles.img} src={step.imgSrc} width="100" height="200" alt={step.title} />
                </div>
              </div>
              <div className={styles.featureTextBox}>
                <p className={styles.featureNum}>{`0${step.id}`}</p>
                <p className={styles.keyword}>{step.keyword}</p>
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
