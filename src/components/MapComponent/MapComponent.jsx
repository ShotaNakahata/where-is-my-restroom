"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/MapLoader";
import styles from "@/components/MapComponent/MapComponent.module.css";
import SearchBar from "@/components/MapComponent/SearchBar";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 34.6937,
  lng: 135.5023,
};

function MapComponent() {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const { isLoaded, loadError } = useGoogleMaps(); // ✅ `Google Maps API` のロード状態を取得

  // ✅ `server-side prefetch` した `toilets` を `useQuery` で取得（再 fetch しない）
  const { data: toilets } = useQuery({
    queryKey: ["toilets"],
    queryFn: ()=>fetchToilets(),
    staleTime: 1000 * 60 * 5, // キャッシュを5分間保持
  });

  console.log("🟢 From MapComponent - Toilets:", toilets);
  console.log("🟢 From MapComponent - Selected Location:", selectedLocation);

  const memoizedMap = useMemo(() => {
    if (!isLoaded) return null;
    return (
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={selectedLocation}>
        {toilets?.map((toilet) => {
          const lat = parseFloat(toilet.latitude);
          const lng = parseFloat(toilet.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;
          return <Marker key={toilet._id} position={{ lat, lng }} />;
        })}
      </GoogleMap>
    );
  }, [isLoaded, selectedLocation, toilets]);

  if (loadError) return <p>Failed to load the map.</p>;

  return (
    <div className={`${styles.mapWrapper}`}>
      <SearchBar onPlaceSelected={setSelectedLocation} />
      {isLoaded ? memoizedMap : <p>Loading map...</p>}
    </div>
  );
}

export default MapComponent;




