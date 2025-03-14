import React from 'react'
import ToiletCard from "@/components/card/ToiletCard";
import styles from "@/app/toilet/list/toiletList.module.css";
import { getToilets } from "@/lib/getToilet";

async function ToiletListPage() {
  const toilets = await getToilets();
  return (
    <main className={`page`}>
      <div className={`pageTextBox`}>
        <h2 className="h2">Restroom List</h2>
        <p className={`pageDescription`}>Find restrooms based on country, rating, and accessibility to suit your needs.</p>
      </div>

      {/* -----------------------------------------
      filter項目を追加する 項目：国・評価・アクセシビリティ 
      -----------------------------------------*/}
      <div className={styles.cardBox}>
        {toilets.map((toilet) => {
          return (
            <ToiletCard key={toilet._id} toilet={toilet} />
          )
        })}
      </div>
    </main>
  )
}

export default ToiletListPage