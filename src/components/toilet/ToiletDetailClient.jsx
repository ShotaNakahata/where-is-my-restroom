"use client";

import React, { useState } from "react";
import Image from "next/image";
import AddRatingForm from "@/components/forms/AddRatingForm";
import styles from "@/components/toilet/ToiletDetailClient.module.css";

function ToiletDetailClient({ initialToilet }) {
  const [toilet, setToilet] = useState(initialToilet);

  function handleRatingUpdate(newRating, newComment) {
    setToilet(prevToilet => ({
      ...prevToilet,
      ratings: [...prevToilet.ratings, newRating],
      averageRating: (
        (prevToilet.ratings.reduce((sum, r) => sum + r, 0) + newRating) / (prevToilet.ratings.length + 1)
      ).toFixed(1),
      comments: [...prevToilet.comments, newComment],
    }));
  }

  return (
    <div className={`${styles.detailPage}`}>
      <div className={`pageTextBox box ${styles.detailTextBox}`}>
        <Image className={styles.img} src={toilet.image} alt="toilet image" width="100" height="100" style={{ width: "100%", height: "auto" }} />
        <div className={styles.positon}>
          <h2 className={`h2 ${styles.title}`}>{toilet.name}</h2>
          <span className={`${styles.toiletType} ${toilet.isUniversal ? styles.accessible : styles.notAccessible}`}>
            {toilet.isUniversal ? "accessible" : "NOT accessible"}
          </span>
        </div>
        <ul className={`${styles.infoBox} listStyleNone`}>
          <li className={`${styles.li} ${styles.infoLi}`}>
            <p className={`${styles.info}`}><span className={styles.span}>rating:</span> {toilet.averageRating}</p>
          </li>
          <li className={`${styles.li} ${styles.infoLi}`}>
            <p className={`${styles.info}`}><span className={styles.span}>address:</span> {toilet.address}</p>
          </li>
        </ul>
      </div>

      {/* ✅ `onRatingAdded` を `AddRatingForm` に渡す */}
      <div className={styles.addRatingForm}>
        <AddRatingForm onRatingAdded={handleRatingUpdate} />
      </div>

      <div className={styles.commentsContainer}>
        <h2 className={`h2 `}>Comments</h2>
        <div className={styles.commentsBox}>
          {toilet.comments.map((comment, index) => (
            <div className={styles.commentBox} key={index}>
              <p className={styles.comment}>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToiletDetailClient;
