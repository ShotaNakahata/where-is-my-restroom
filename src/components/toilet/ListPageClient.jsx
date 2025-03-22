"use client";
import React, { useEffect, useState } from "react";
import ToiletCard from "@/components/card/ToiletCard";
import styles from "@/app/toilet/list/toiletList.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { useQuery } from "@tanstack/react-query";
import FilterComponent from "@/components/filter/FilterComponent";
import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";
import { useInitFavoriteFetch } from "@/hooks/useInitFavoriteFetch";
// import { fetchFavorites } from "@/lib/getFavorite";
// import { useDispatch, useSelector } from "react-redux";
// import { setFavorites } from "@/redux/slices/favoriteSlice";

function ListPageClient() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  // const auth = useSelector((state) => state.auth);
  // const {favoriteToilets} = useSelector((state) => state.favorite);
  const { data: toilets = [], error, isLoading } = useQuery({
    queryKey: ["toilets"],
    queryFn: () => fetchToilets(),
    staleTime: 300000, // 5分キャッシュ
  });
  useInitFavoriteFetch();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("form listPageClient:「start useEffect fetchFavorite」");
  //   if (
  //     auth.isAuthenticated &&
  //     auth.user?._id &&
  //     (!favoriteToilets || favoriteToilets.length === 0) // ← すでにあるなら fetch しない
  //   ) {
  //     console.log("First fetch Favorite and save on redux")
  //     fetchFavorites(auth.user._id)
  //       .then((favorites) => dispatch(setFavorites(favorites)))
  //       .catch((err) => {
  //         console.error("❌ Failed to load favorites:", err);
  //       });
  //   }
  //   console.log("after useEffect fetchFavorite:[favoriteToilets]", favoriteToilets)
  // }, [auth.isAuthenticated, auth.user?._id, favoriteToilets, dispatch]);

  const [filters, setFilters] = useState({
    topRating: false,
    accessible: false,
    country: "",
  })

  const filteredToilets = toilets.filter((toilet) => {
    if (filters.topRating && toilet.averageRating < 5) return false;
    if (filters.accessible && !toilet.isUniversal) return false;
    if (filters.country && toilet.country !== filters.country) return false;
    return true;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  }
  function handleLoginClose() {
    setIsLoginOpen(false)
  }

  if (isLoading) return <p>Loading toilets...</p>; // ✅ `isLoading` の間は `.map()` を実行しない
  if (error) return <p>Error loading toilets</p>;

  return (
    <main className={`page ${styles.relative}`}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} alert="Please log in to add this toilet to your favorites." />}
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>
      <FilterComponent filters={filters} onFilterChange={handleFilterChange} />
      <div className={styles.cardBox}>
        {filteredToilets.length > 0 ? (
          filteredToilets.map((toilet) => (
            <ToiletCard key={toilet._id}
              toilet={toilet}
              setIsLoginOpen={setIsLoginOpen}
              setIsModalOpen={setIsModalOpen}
              setModalData={setModalData} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </main>
  );
}

export default ListPageClient;
