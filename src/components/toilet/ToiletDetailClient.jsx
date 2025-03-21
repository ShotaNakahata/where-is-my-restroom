"use client";

import React, { useState } from "react";
import Image from "next/image";
import AddRatingForm from "@/components/forms/AddRatingForm";
import styles from "@/components/toilet/ToiletDetailClient.module.css";
import { useSelector } from "react-redux";
import LoginModal from "@/components/common/LoginModal";

function ToiletDetailClient({ initialToilet }) {
  const [toilet, setToilet] = useState(initialToilet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth)

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
  function handleLoginClose() {
    setIsLoginOpen(false)
  }
  async function handleAddFavorite() {
    if (!isAuthenticated) {
      console.log("not login")
      setIsLoginOpen(true);
    } else {
      try {
        await fetchAddFavorite(user._id, toilet._id);
        setIsModalOpen(true);
        console.log("🟢 Favorite added successfully!");
      } catch (error) {
        setIsModalOpen(true);
        console.error("❌ Failed to add favorite:", error);
      }
    }
  }

  return (
    <div className={`${styles.detailPage}`}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose}/>}
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
        <div className={`${styles.favoriteBtn}`}>
          <button className={`btnLg ${styles.favoriteBtn}`}
            onClick={handleAddFavorite}>
            Add Favorite
          </button>
        </div>
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
