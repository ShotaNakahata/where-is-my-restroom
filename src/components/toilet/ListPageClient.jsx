"use client";
import React, { useEffect, useRef, useState } from "react";
import ToiletCard from "@/components/card/ToiletCard";
import listStyles from "@/app/toilet/list/toiletList.module.css";
import styles from "@/components/toilet/ListPageClient.module.css";
import FilterComponent from "@/components/filter/FilterComponent";
import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";
import { useInitFavoriteFetch } from "@/hooks/useInitFavoriteFetch";
import { useDisableScroll } from "@/utils/useDisableScroll";
import { useDispatch, useSelector } from "react-redux";
import { addToilet } from "@/redux/slices/toiletsSlice";
import { useInfiniteToiletData } from "@/hooks/useInfiniteToiletData";

function ListPageClient() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observerTarget, setObserverTarget] = useState(null);
  useDisableScroll(isLoginOpen || isModalOpen);
  const dispatch = useDispatch();
  const { toilets } = useSelector((state) => state.toilets);
  const [modalData, setModalData] = useState();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteToiletData();

  useEffect(() => {
    if (!data?.pages) return;
    const flattenedToilets = data.pages.flatMap((page) => page.toilets ?? page);
    console.log("ListPageClient [data]", data);
    console.log("ListPageClient [flattenedToilets]", flattenedToilets);
    dispatch(addToilet(flattenedToilets)); 
  }, [data, dispatch]);

  const observerRef = useRef();
  useEffect(() => {
    if (!observerTarget) {
      console.log("❌ observerTarget が null");
      return;
    }
    console.log("✅ observerTarget に DOM がセットされた！:", observerTarget);

    if (!hasNextPage) {
      console.log("🔚 hasNextPage が false のため、observe せず");
      return;
    }
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
  
    observer.observe(observerTarget);
  
    return () => {
      observer.disconnect();
    };
  }, [observerTarget, hasNextPage]);


  useInitFavoriteFetch();

  const [filters, setFilters] = useState({
    topRating: false,
    accessible: false,
    country: "",
  })

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
        ) : filteredToilets?.length > 0 ? (
          <>
            {filteredToilets.map((toilet) => (
              <ToiletCard
                key={toilet._id}
                toilet={toilet}
                setIsLoginOpen={setIsLoginOpen}
                setIsModalOpen={setIsModalOpen}
                setModalData={setModalData}
              />
            ))}
            {/* ✅ 最後にローディング表示＋ref設置 */}
            <div ref={(el) => {
              observerRef.current = el;
              setObserverTarget(el); // 💡 state にも保存
            }} style={{ height: 1 }}>
              {isFetchingNextPage && <p className="statusMessage">Loading more toilets...</p>}
            </div>
          </>
        ) : (
          <p className="statusMessage">No results found.</p>
        )}
      </div>
    </main>
  );
}

export default ListPageClient;
