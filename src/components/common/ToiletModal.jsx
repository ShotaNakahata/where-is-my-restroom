"use client"
import React from 'react'
import modalStyles from "@/components/common/Modal.module.css";
import cardStyles from "@/components/card/ToiletCard.module.css";
import styles from "@/components/common/ToiletModal.module.css";
import Link from "next/link";
import { useFavoriteAction } from "@/hooks/useFavoriteAction";
import Modal from "@/components/common/Modal";
import LoginModal from "@/components/common/LoginModal";
import { useSelector } from 'react-redux';

function ToiletModal({ btnMessage, onClose, toilet }) {
  const {
    isLoginOpen,
    isModalOpen,
    modalData,
    setIsLoginOpen,
    setIsModalOpen,
    toggleFavorite
  } = useFavoriteAction();
  const { favoriteToilets } = useSelector((state) => state.favorite);
  const isFavorite = favoriteToilets.some((favorite) => favorite._id === toilet._id)
  function handleLoginClose() {
    setIsLoginOpen(false)
  }
  return (
    <div className={`${modalStyles.modalOverlay} `}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} />}
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <div className={`${modalStyles.modalContent} ${styles.relative} ${styles.pt}`}>
        <div className={cardStyles.toiletTextInfo}>
          <div className={`${cardStyles.mainTileBox} ${styles.mb}`}>
            <div className={`${styles.closeIcon}`} onClick={() => onClose()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${styles.icon} ${styles.fixedIcon}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <span
              className={`${cardStyles.toiletType} ${toilet.isUniversal ? cardStyles.accessible : cardStyles.notAccessible}`}>
              {toilet.isUniversal ? "accessible" : "NOT accessible"}
            </span>
            <p className={`${cardStyles.toiletName} ${styles.name}`}>{toilet.name}</p>
            <div className={`${styles.btnBox}`}>
              <button className={`${styles.ModalBtn} btnLg ${isFavorite && "isFavorite"}`} onClick={() => toggleFavorite(toilet, isFavorite)}>{isFavorite ? "Remove Favorite" : "Add Favorite"}</button>
              <Link href={`/toilet/detail/${toilet._id}`} className={`${styles.ModalBtn} btnLg`}>View details</Link>
            </div>
          </div>
          <ul className={`${cardStyles.cardUl} ${styles.cardUI}`}>
            <li className={cardStyles.cardli}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`icon ${styles.modalIcon}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className={`${cardStyles.span} ${styles.detail}`}>{toilet.address}</span>
            </li>
            <li className={cardStyles.cardli}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`icon ${styles.modalIcon}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span className={`${cardStyles.span} ${styles.detail}`}>{toilet.averageRating}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ToiletModal