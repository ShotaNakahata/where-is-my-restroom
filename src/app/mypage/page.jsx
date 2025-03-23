"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/app/mypage/MyPage.module.css";
import { useSelector } from 'react-redux';
import ToiletCard from "@/components/card/ToiletCard";
import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";
import { useInitFavoriteFetch } from "@/hooks/useInitFavoriteFetch";
import { useDisableScroll } from "@/utils/useDisableScroll";

function MyPage() {
  useInitFavoriteFetch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { favoriteToilets } = useSelector((state) => state.favorite);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  useDisableScroll(isLoginOpen || isModalOpen);
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    }
  }, [])
  function handleLoginClose() {
    setIsLoginOpen(false)
  }

  console.log("from MyPage[favoriteToilets]", favoriteToilets)

  const displayUser = isAuthenticated ? user : { name: "unknown", email: "unknown" };

  return (
    <main className={`page`}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} alert="You need to log in to access My Page." />}
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <div className={`pageTextBox ${styles.titleBox}`}>
        <h2 className='h2'>My Page</h2>
        <p className={`pageDescription ${styles.subHeading}`}>View and manage your profile and favorite toilets easily in My Page.</p>
      </div>
      <div className={`${styles.contentsBox}`}>
        <div className={`${styles.userInfoContainer}`}>
          <p className={`h3 ${styles.h3}`}>User Information</p>
          <div className={`${styles.userInfoBox}`}>
            <h3 className={`${styles.userInfo}`}>User Name: {displayUser.name}</h3>
            <p className={`${styles.userInfo}`}>Email: {displayUser.email}</p>
          </div>
        </div>

        <div className={`${styles.favoriteBox}`}>
          <h3 className={`h3 ${styles.h3}`}>Favorite Toilets</h3>
          {/* {isLoading ? <p>Loading favorites...</p> : null}
          {error ? <p>Error loading favorites.</p> : null} */}

          <div className={styles.cardBox}>
            {Array.isArray(favoriteToilets) && favoriteToilets.length > 0 ? (
              favoriteToilets.map((toilet) => (
                <ToiletCard key={toilet._id}
                  toilet={toilet}
                  setIsLoginOpen={setIsLoginOpen}
                  setIsModalOpen={setIsModalOpen}
                  setModalData={setModalData} />
              ))
            ) : (
              <p>No favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyPage;
