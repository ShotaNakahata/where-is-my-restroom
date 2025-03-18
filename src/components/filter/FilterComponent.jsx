import React, { useState } from 'react'
import styles from "@/components/filter/FilterComponent.module.css";

function FilterComponent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.filterContainer}>
      {/* Country Filter */}
      <div className={`${styles.btnContainer} ${isOpen ? styles.open : ""}`}>
        <button disabled={isOpen} onClick={() => setIsOpen(true)} className={`${styles.btn} ${styles.optionBtn}`}>Filter option</button>
      </div>
      <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
        <div className={styles.optionContainer}>
          <button className={`${styles.closeBtn}`} onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${styles.icon} ${styles.fixedIcon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div >

            <div className={`${styles.optionTextContents}`}>
              <h2 className='h2'>Option</h2>
            </div>

            <div className={styles.optionContents}>
              <div className={styles.option}>
                <label htmlFor="topRating">Top Rating:</label>
                <input className={`${styles.checkBox}`} name='topRating' type="checkbox" />
              </div>
              <div className={styles.option}>
                <label htmlFor="topRating">Top Rating:</label>
                <input className={`${styles.checkBox}`} name='topRating' type="checkbox" />
              </div>
              <div className={styles.option}>
                <label htmlFor="topRating">Top Rating:</label>
                <input className={`${styles.checkBox}`} name='topRating' type="checkbox" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterComponent