"use client"
import React, { useState } from 'react';
import styles from "@/app/mypage/MyPage.module.css";
import { useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "@/lib/getFavorite";
import ToiletCard from "@/components/card/ToiletCard";

function MyPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  function handleLoginClose() {
    setIsLoginOpen(false)
  }

  // // ✅ `favorite` を取得
  const { data: favoriteToilets, isLoading, error } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user._id),
    enabled: isAuthenticated && Boolean(user?._id),
    staleTime: 10000
  });

  console.log("from MyPage[favoriteToilets]", favoriteToilets)

  const displayUser = isAuthenticated ? user : { name: "unknown", email: "unknown" };

  return (
    <main className={`page`}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} />}
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <div className={`pageTextBox ${styles.titleBox}`}>
        <h2 className='h2'>My Page</h2>
        <p className={`pageDescription`}>View and manage your profile and favorite toilets easily in My Page.</p>
      </div>
      <div className={`${styles.contentsBox}`}>
        <div className={`${styles.userInfoBox}`}>
          <h3 className={`${styles.userInfo}`}>User Name: {displayUser.name}</h3>
          <p className={`${styles.userInfo}`}>Email: {displayUser.email}</p>
        </div>

        <div className={`${styles.favoriteBox}`}>
          <h3 className={`h3 ${styles.h3}`}>Favorite Toilets</h3>
          {isLoading ? <p>Loading favorites...</p> : null}
          {error ? <p>Error loading favorites.</p> : null}

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
