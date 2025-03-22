import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/card/ToiletCard.module.css";
import { addFavorite } from "@/utils/addFavorite";
import { useSelector } from 'react-redux';

function ToiletCard({ setIsLoginOpen, setIsModalOpen, setModalData, toilet }) {
  const auth = useSelector((state) => state.auth);
  return (
    <div key={toilet._id} className={`${styles.toilet} box`}>
      <Link href={`/toilet/detail/${toilet._id}`} className={`${styles.notLink}`}>
        <div className={styles.toiletImg}>
          <Image className={styles.img} src={toilet.image} alt="" width="100" height="100" style={{ width: "100%", height: "auto" }} />
        </div>
        <div className={styles.toiletTextInfo}>
          <div className={styles.mainTileBox}>
            <span
              className={`${styles.toiletType} ${toilet.isUniversal ? styles.accessible : styles.notAccessible}`}>
              {toilet.isUniversal ? "accessible" : "NOT accessible"}
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
              <span className={styles.span}>{toilet.averageRating}</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className={`${styles.favoriteBtn}`}>
        <button className={`btnLg ${styles.favoriteBtn}`}
          onClick={() => addFavorite({ setIsLoginOpen, setIsModalOpen, setModalData, auth, toilet })}>
          Add Favorite
        </button>
      </div>
    </div>
  )
}

export default ToiletCard