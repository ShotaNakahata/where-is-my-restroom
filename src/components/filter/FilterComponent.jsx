"use client"
import React, { useState } from "react";
import styles from "@/components/filter/FilterComponent.module.css";
import { useDisableScroll } from "@/utils/useDisableScroll";

function FilterComponent({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  useDisableScroll(isOpen);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    onFilterChange(newFilters);
  };

  const handleBoxClick = (name) => {
    const newFilters = {
      ...filters,
      [name]: !filters[name],
    };
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Country Filter */}
      <div className={`${styles.btnContainer} ${isOpen ? styles.open : ""}`}>
        <button disabled={isOpen} onClick={() => setIsOpen(true)} className={`${styles.btn} ${styles.optionBtn}`}>
          Filter option
        </button>
      </div>
      <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
        <div className={styles.optionContainer}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${styles.icon} ${styles.fixedIcon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <div className={styles.optionTextContents}>
              <h2 className={`h2 ${styles.h2}`}>Option</h2>
            </div>
            <div className={styles.optionContents}>
              {/* ✅ `Top Rating` チェックボックス */}
              <div className={styles.option}>
                <label className={styles.label} htmlFor="topRating">Top Rating :</label>
                <input
                  id="topRating"
                  className={styles.checkBox}
                  name="topRating"
                  type="checkbox"
                  checked={filters.topRating}
                  onChange={handleChange}
                />
                <div className={styles.box} onClick={() => handleBoxClick("topRating")}></div>
              </div>

              {/* ✅ `Accessible` チェックボックス */}
              <div className={styles.option}>
                <label className={styles.label} htmlFor="accessible">Accessible :</label>
                <input
                  id="accessible"
                  className={styles.checkBox}
                  name="accessible"
                  type="checkbox"
                  checked={filters.accessible}
                  onChange={handleChange}
                />
                <div className={styles.box} onClick={() => handleBoxClick("accessible")}></div>
              </div>

              {/* ✅ `Country` を `select` に変更 */}
              <div className={styles.option}>
                <label className={styles.label}>Country:</label>
                <select className={styles.selectBox} name="country" value={filters.country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  <option value="Japan">Japan</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;

