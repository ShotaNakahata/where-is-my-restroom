import React from 'react'
import MapComponent from "@/components/MapComponent/MapComponent";
import styles from "@/components/MapComponent/MapPageUI.module.css";

function MapPageUI() {
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
  )
}

export default MapPageUI