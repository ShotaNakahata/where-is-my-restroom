"use client";
import React, { useEffect, useState } from "react";
import ToiletCard from "@/components/card/ToiletCard";
import listStyles from "@/app/toilet/list/toiletList.module.css";
import styles from "@/components/toilet/ListPageClient.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { useQuery } from "@tanstack/react-query";
import FilterComponent from "@/components/filter/FilterComponent";
import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";
import { useInitFavoriteFetch } from "@/hooks/useInitFavoriteFetch";
import { useDisableScroll } from "@/utils/useDisableScroll";
import { useDispatch, useSelector } from "react-redux";
import { setToilets } from "@/redux/slices/toiletsSlice";

function ListPageClient() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useDisableScroll(isLoginOpen || isModalOpen);
  const dispatch = useDispatch();
  const { toilets } = useSelector((state) => state.toilets);
  const [modalData, setModalData] = useState();
  const { data, error, isLoading } = useQuery({
    queryKey: ["toilets"],
    queryFn: () => fetchToilets(),
    staleTime: 300000,
  });
  useEffect(() => {
    dispatch(setToilets(data));
  }, [data, dispatch]);

  console.log("🟢 Redux内のtoilets:", toilets);
  useInitFavoriteFetch();

  const [filters, setFilters] = useState({
    topRating: false,
    accessible: false,
    country: "",
  })

  // const filteredToilets = toilets.filter((toilet) => {
  const filteredToilets = (toilets ?? []).filter((toilet) => {
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

  // if (isLoading) return <p>Loading toilets...</p>;
  // if (error) return <p>Error loading toilets</p>;

  return (
    <main className={`page ${listStyles.relative} ${styles.pageMinHeight}`}>
      {isLoginOpen && <LoginModal onCloseIsModal={handleLoginClose} alert="Please log in to add this toilet to your favorites." />}
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription ${styles.subHeading}`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>
      <FilterComponent filters={filters} onFilterChange={handleFilterChange} />
      <div className={listStyles.cardBox}>
        {isLoading ? (
          <p className="statusMessage">Loading toilets...</p>
        ) : error ? (
          <p className="statusMessage">Error loading toilets</p>
        ) : filteredToilets.length > 0 ? (
          filteredToilets.map((toilet) => (
            <ToiletCard
              key={toilet._id}
              toilet={toilet}
              setIsLoginOpen={setIsLoginOpen}
              setIsModalOpen={setIsModalOpen}
              setModalData={setModalData}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </main>
  );
}

export default ListPageClient;
