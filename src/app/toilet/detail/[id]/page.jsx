import React from 'react'
import { notFound } from "next/navigation";
import styles from "./ToiletDetail.module.css";
import { getToilets } from "@/lib/getToilet";
import AddRatingForm from "@/components/forms/AddRatingForm";

async function ToiletDetail({ params }) {
  const toilet = await getToilets(params.id);
  if (!toilet) return notFound()
  console.log("from ToiletDetail toilet :", toilet);
  console.log("from ToiletDetail toilet.comments:", toilet.comments);
  return (
    <main className={`page ${styles.detailPage}`}>
      <div className={`pageTextBox ${styles.detailTextBox}`}>
        <h2 className={`h2 ${styles.toiletName}`}>{toilet.name}</h2>
        <span className={`${styles.toiletType} ${toilet.isUniversal ? styles.accessible : styles.notAccessible}`}>
          {toilet.isUniversal ? "accessible" : "NOT accessible"}
        </span>

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
      <AddRatingForm />
      <div className={styles.commentsContainer}>
        <h2 className={`h2`}>Comments</h2>
        <div className={styles.commentBox}>
          {toilet.comments.map((comment, index) => {
            return (
              <div key={index}>
                {comment}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  )
}

export default ToiletDetail