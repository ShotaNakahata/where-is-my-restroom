// "use client"
// import React from 'react'
// import ToiletCard from "@/components/card/ToiletCard";
// import styles from "@/app/toilet/list/toiletList.module.css";
// import { fetchToilets } from "@/lib/fetchToilets";
// import { useQuery } from "@tanstack/react-query";

// function ListPageClient() {
//   const { data: toilets, error, isLoading } = useQuery({
//     queryKey: ["toilets"],
//     queryFn: fetchToilets,
//     staleTime: 300000, //5分キャッシュ
//   })
//   if (isLoading) return <p>Loading toilets...</p>; // ✅ `Loading` の間は `.map()` を実行しない
//   if (error) return <p>Error loading toilets</p>;
//   console.log(toilets)
//   return (
//     <main className={`page`}>
//       <div className={`pageTextBox`}>
//         <h2 className="h2">Restroom List</h2>
//         <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
//       </div>

//       {/* -----------------------------------------
//       filter項目を追加する 項目：国・評価・アクセシビリティ 
//       -----------------------------------------*/}
//       <div className={styles.cardBox}>
//         {toilets.map((toilet) => {
//           return (
//             <ToiletCard key={toilet._id} toilet={toilet} />
//           )
//         })}
//       </div>
//     </main>
//   )
// }

// export default ListPageClient
"use client";

import React from "react";
import ToiletCard from "@/components/card/ToiletCard";
import styles from "@/app/toilet/list/toiletList.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { useQuery } from "@tanstack/react-query";

function ListPageClient() {
  const { data: toilets = [], error, isLoading } = useQuery({
    queryKey: ["toilets"],
    queryFn: ()=>fetchToilets(),
    staleTime: 300000, // 5分キャッシュ
  });

  console.log("🟢 useQuery data:", toilets); // ✅ `data` の状態をログ出力
  console.log("🟢 useQuery isLoading:", isLoading);
  console.log("🟢 useQuery error:", error);

  if (isLoading) return <p>Loading toilets...</p>; // ✅ `isLoading` の間は `.map()` を実行しない
  if (error) return <p>Error loading toilets</p>;

  return (
    <main className={`page`}>
      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>

      <div className={styles.cardBox}>
        {toilets?.map((toilet) => (
          <ToiletCard key={toilet._id} toilet={toilet} />
        ))}
      </div>
    </main>
  );
}

export default ListPageClient;
