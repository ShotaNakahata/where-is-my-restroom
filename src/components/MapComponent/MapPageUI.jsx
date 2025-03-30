"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "@/components/MapComponent/MapPageUI.module.css";


const MapComponent = dynamic(() => import("@/components/MapComponent/MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPageUI() {
  return (
    <main className={`page`}>
      <div className={`container`}>
        <div className={`${styles.textContainer} pageTextBox`}>
          <h2 className={`h2 ${styles.h2}`}>Find Restrooms Using the Map</h2>
          <p className={`${styles.description} pageDescription`}>
            Use the interactive map to easily locate nearby restrooms. Click on a marker to see details about each facility.
          </p>
        </div>
        <MapComponent />
      </div>
    </main>
  );
}
