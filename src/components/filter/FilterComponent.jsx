import React from 'react'
import styles from "@/components/filter/FilterComponent.module.css";

function FilterComponent() {
  return (
    <div className={styles.filterContainer}>
      {/* Country Filter */}
      <div className={`${styles.btnContainer}`}>
        <button className={`btn ${styles.optionBtn}`}>Filter option</button>
      </div>
      <div className={`${styles.options}`}>
      <div className={styles.option}>
        <label htmlFor="topRating">Top Rating:</label>
        <input name='topRating' type="checkbox" />
      </div>
      <div className={styles.option}>
        <label htmlFor="topRating">Top Rating:</label>
        <input name='topRating' type="checkbox" />
      </div>
      <div className={styles.option}>
        <label htmlFor="topRating">Top Rating:</label>
        <input name='topRating' type="checkbox" />
      </div>
      </div>
    </div>
  )
}

export default FilterComponent