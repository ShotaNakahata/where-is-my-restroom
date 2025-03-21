"use client";
import React, { useState } from "react";
import ToiletCard from "@/components/card/ToiletCard";
import styles from "@/app/toilet/list/toiletList.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { useQuery } from "@tanstack/react-query";
import FilterComponent from "@/components/filter/FilterComponent";
import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";

function ListPageClient() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const { data: toilets = [], error, isLoading } = useQuery({
    queryKey: ["toilets"],
    queryFn: () => fetchToilets(),
    staleTime: 300000, // 5分キャッシュ
  });

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
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} />}
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
