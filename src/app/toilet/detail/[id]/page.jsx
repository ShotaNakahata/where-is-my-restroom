import React from 'react'
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./ToiletDetail.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import AddRatingForm from "@/components/forms/AddRatingForm";

async function ToiletDetail({ params }) {
  const toilet = await fetchToilets(params.id);
  if (!toilet) return notFound()
  return (
    <main className={`page`}>
      <h2 className={`h2 ${styles.pageTitle}`}>Toilet Detail</h2>
      <div className={`${styles.detailPage}`}>
        <div className={`pageTextBox box ${styles.detailTextBox}`}>
          {/* <div className={`${styles.imgBox}pageTextBox`}> */}
          <Image className={styles.img} src={toilet.image} alt="toilet image" width="100" height="100" style={{ width: "100%", height: "auto" }} />
          {/* </div> */}
          <div className={styles.positon}>
            <h2 className={`h2 ${styles.title}`}>{toilet.name}</h2>
            <span className={`${styles.toiletType} ${toilet.isUniversal ? styles.accessible : styles.notAccessible}`}>
              {toilet.isUniversal ? "accessible" : "NOT accessible"}
            </span>
          </div>

          <ul className={`${styles.btnBox} listStyleNone`}>
            <li className={`${styles.li} ${styles.btnLi}`}>
              <button className={`${styles.btn}`}>Add Favorite</button>
            </li>
            <li className={`${styles.li} ${styles.btnLi}`}>
              <button className={`${styles.btn}`}>Map Open</button>
            </li>
          </ul>
          <ul className={`${styles.infoBox} listStyleNone`}>
            <li className={`${styles.li} ${styles.infoLi}`}>
              <p className={`${styles.info}`}><span className={styles.span}>rating:</span>  {toilet.averageRating}</p>
            </li>
            <li className={`${styles.li} ${styles.infoLi}`}>
              <p className={`${styles.info}`}><span className={styles.span}>address:</span>  {toilet.address}</p>
            </li>
          </ul>
        </div>
        <div className={styles.addRatingForm}>
          <AddRatingForm />
        </div>
        <div className={styles.commentsContainer}>
          <h2 className={`h2 `}>Comments</h2>
          <div className={styles.commentsBox}>
            {toilet.comments.map((comment, index) => {
              return (
                <div className={styles.commentBox} key={index}>
                  <p className={styles.comment}>{comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ToiletDetail