"use client";
import React from "react";
import ToiletCard from "@/components/card/ToiletCard";
import styles from "@/app/toilet/list/toiletList.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { useQuery } from "@tanstack/react-query";
import FilterComponent from "@/components/filter/FilterComponent";

function ListPageClient() {
  const { data: toilets = [], error, isLoading } = useQuery({
    queryKey: ["toilets"],
    queryFn: () => fetchToilets(),
    staleTime: 300000, // 5分キャッシュ
  });

  if (isLoading) return <p>Loading toilets...</p>; // ✅ `isLoading` の間は `.map()` を実行しない
  if (error) return <p>Error loading toilets</p>;

  return (
    <main className={`page ${styles.relative}`}>
      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>
      <FilterComponent />
      <div className={styles.cardBox}>
        {toilets?.map((toilet) => (
          <ToiletCard key={toilet._id} toilet={toilet} />
        ))}
      </div>
    </main>
  );
}

export default ListPageClient;
