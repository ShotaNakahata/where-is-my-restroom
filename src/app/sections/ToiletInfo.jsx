import React from 'react'
import styles from "./ToiletInfo.module.css";
import Image from "next/image";

const ToietInfoEx = [{
  id: 1,
  name: "梅田スカイビルトイレ",
  imgSrc: "/meal-1.jpg",
  alt: "梅田スカイビルトイレ image",
  type: "Accessible",
  place: "大阪府大阪市北区大深町1-1",
  rating: 5,
}, {
  id: 2,
  name: "梅田スカイビルトイレ",
  imgSrc: "/meal-1.jpg",
  alt: "梅田スカイビルトイレ image",
  type: "NO Accessible",
  place: "大阪府大阪市北区大深町1-1",
  rating: 5,
}]

function ToiletInfo() {
  return (
    <section className={`${styles.sectionToileInfo} sectionP`}>
      <div className={`container centerText`}>
        <span className="subheading">RESTROOMS</span>
        <h2 className="h2">Find your favorite restroom in your city!</h2>
      </div>
      <div className={`container grid grid1col ${styles.mb}`}>
        {ToietInfoEx.map((toiletEx) => {
          return (
            <div key={toiletEx.id} className={`${styles.toilet} box`}>
              <div className={styles.toiletImg}>
                <Image className={styles.img} src={toiletEx.imgSrc} alt={toiletEx.alt} width="350" height="233"style={{ width: "100%", height: "auto" }} />
              </div>
              <div className={styles.toiletTextInfo}>
                <span
                  className={`${styles.toiletType} ${toiletEx.type === "Accessible" ? styles.accessible : styles.notAccessible}`}>
                  {toiletEx.type}
                </span>
                <p className={styles.toiletName}>{toiletEx.name}</p>
                <ul className={styles.toiletUl}>
                  <li className={styles.toiletLi}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>{toiletEx.place}</span>
                  </li>
                  <li className={styles.toiletLi}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span>{toiletEx.rating}</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      <div className={`container flexCenter`}>
      <button className={`btnLg ${styles.toiletBtn}`}>Find nearby restrooms</button>
      </div>
    </section>
  )
}

export default ToiletInfo