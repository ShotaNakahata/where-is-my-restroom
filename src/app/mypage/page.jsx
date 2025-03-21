"use client"
import React from 'react';
import styles from "@/app/mypage/MyPage.module.css";
import { useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "@/lib/getFavorite";

function MyPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // // ✅ `favorite` を取得
  const { data: favoriteToilets, isLoading, error } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user._id),
    enabled: isAuthenticated && Boolean(user?._id),
    staleTime:10000
  });

  const displayUser = isAuthenticated ? user : { name: "unknown", email: "unknown" };

  return (
    <main className={`page`}>
      <div className={`pageTextBox`}>
        <h2 className='h2'>My Page</h2>
        <p className={`pageDescription`}>View and manage your profile and favorite toilets easily in My Page.</p>
      </div>
      <div className={`${styles.contentsBox}`}>
        <div className={`${styles.userInfo}`}>
          <h3 className={`h3`}>User Name: {displayUser.name}</h3>
          <p className={`${styles.p}`}>Email: {displayUser.email}</p>
        </div>

        <div className={`${styles.favoriteBox}`}>
          <h3 className={`h3`}>Favorite Toilets</h3>
          {isLoading ? <p>Loading favorites...</p> : null}
          {error ? <p>Error loading favorites.</p> : null}
          {favoriteToilets?.length > 0 ? (
            <ul>
              {favoriteToilets.map((toilet) => (
                <li key={toilet._id}>{toilet.name}</li>
              ))}
            </ul>
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default MyPage;
