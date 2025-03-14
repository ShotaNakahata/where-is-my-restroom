import React from 'react'
import styles from "@/app/toilet/list/toiletList.module.css";
import toilets from "@/testData/testRestrooms";
import Image from "next/image";

function page() {
  return (
    <main className={`page`}>


      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>

      {/* -----------------------------------------
      filter項目を追加する 項目：国・評価・アクセシビリティ 
      -----------------------------------------*/}
      <div className={styles.cardBox}>
        {toilets.map((toilet) => {
          return (
            <div key={toilet.id} className={`${styles.toilet} box`}>
              <div className={styles.toiletImg}>
                <Image className={styles.img} src={toilet.imgSrc} alt="" width="100" height="100" style={{ width: "100%", height: "auto" }} />
              </div>
              <div className={styles.toiletTextInfo}>
                <div className={styles.mainTileBox}>
                  <span
                    className={`${styles.toiletType} ${toilet.accessible ? styles.accessible : styles.notAccessible}`}>
                    {toilet.accessible ? "accessible" : "NOT accessible"}
                  </span>
                  <p className={styles.toiletName}>{toilet.name}</p>
                </div>
                <ul className={styles.cardUl}>
                  <li className={styles.cardli}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className={styles.span}>{toilet.address}</span>
                  </li>
                  <li className={styles.cardli}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span className={styles.span}>{toilet.rating}</span>
                  </li>
                </ul>
              </div>
            </div>
            // <div key={toilet.id} className={styles.card}>
            //   <Image className={styles.img} src={toilet.imgSrc} alt='toilet image' width="100" height="100" />
            //   <div className={styles.textContent}>
            //     <p className={styles.toiletName}>{toilet.name}</p>
            //     <ul className={styles.cardUl}>
            //       <li className={`${styles.li} ${toilet.accessible ? `${styles.accessible}` : `${styles.notAccessible}`}`}>
            //         {toilet.accessible ? "accessible" : "NOT accessible"}
            //       </li>
            //       <li className={styles.li}>
            //         <span className={styles.span}>rating:</span> {toilet.rating}
            //       </li>
            //       <li className={styles.li}>
            //         <span className={styles.span}>address:</span> {toilet.address}
            //       </li>
            //     </ul>
            //   </div>
            // </div>
          )
        })}
      </div>
    </main>
  )
}

export default page