"use client";
import React, { useState } from "react";
import styles from "@/components/forms/rating/StarRating.module.css";

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            className={`${styles.starButton} ${ratingValue <= (hover ?? value) ? styles.on : styles.off}`}
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            aria-label={`Rate ${styles.ratingValue} stars`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
