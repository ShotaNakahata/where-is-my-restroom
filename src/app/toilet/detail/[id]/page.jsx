import React from 'react'
import { notFound } from "next/navigation";
import styles from "./ToiletDetail.module.css";
import { getToilets } from "@/lib/getToilet";

async function ToiletDetail({ params }) {
  const toilet = await getToilets(params.id);
  if (!toilet) return notFound()
    console.log("from ToiletDetail toilet :",toilet);
    console.log("from ToiletDetail toilet.comments:",toilet.comments);
  return (
    <main className={`page`}>
      <div className={`pageTextBox`}>
        <h2 className={`h2`}>name: {toilet.name}</h2>
        <span className={`${styles.toiletType} ${toilet.isUniversal ? styles.accessible : styles.notAccessible}`}>
          {toilet.isUniversal ? "accessible" : "NOT accessible"}
        </span>
        <ul className={styles.btnBox}>
          <li className={`${styles.li} ${styles.btnLi}`}>
            <button className={`btnLg`}>Add Favorite</button>
          </li>
          <li className={`${styles.li} ${styles.btnLi}`}>
            <button className={`btnLg`}>Map Open</button>
          </li>
        </ul>
        <ul className={styles.infoBox}>
          <li className={`${styles.li} ${styles.infoLi}`}>
            <p className={`${styles.info}`}>rating: {toilet.averageRating}</p>
          </li>
          <li className={`${styles.li} ${styles.infoLi}`}>
            <p className={`${styles.info}`}>address: {toilet.address}</p>
          </li>
          {/* --------------
            ADD RATING 
          --------------*/}
          <div className={styles.commentsContainer}>
            <h2 className={`h2`}>Comments</h2>
            <div className={styles.commentBox}>
              {toilet.comments.map((comment,index)=>{
                return(
                  <div key={index}>
                  {comment}
                </div>
                );
              })}
            </div>
          </div>
        </ul>
      </div>
    </main>
  )
}

export default ToiletDetail