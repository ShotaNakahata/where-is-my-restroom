"use client";
import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/MapLoader";
import styles from "@/components/MapComponent/SearchBar.module.css";

export default function SearchBar({ onPlaceSelected }) {
  const [query, setQuery] = useState("");
  const autocompleteRef = useRef(null);
  const { isLoaded } = useGoogleMaps(); // ✅ `Google Maps API` のロード状態を取得

  useEffect(() => {
    if (!isLoaded || !autocompleteRef.current) return;

    const handlePlaceChanged = () => {
      if (!autocompleteRef.current) {
        console.error("❌ Autocomplete ref is null!");
        return;
      }

      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry) {
        console.warn("⚠️ `getPlace()` failed, trying Geocoding API...");
        handleGeocodeSearch(query); // 🔹 `Geocoding API` を使用して検索
        return;
      }

      console.log("🟢 Selected Place (from getPlace()):", place);

      onPlaceSelected({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      setQuery(place.name);
    };

    // ✅ `addListener` の戻り値を保存
    const listener = autocompleteRef.current.addListener("place_changed", handlePlaceChanged);

    return () => {
      // ✅ `google.maps.event.removeListener` を使ってリスナーを削除
      google.maps.event.removeListener(listener);
    };
  }, [isLoaded, query]);

  // ✅ `Geocoding API` を使用して検索
  const handleGeocodeSearch = (searchQuery) => {
    if (!searchQuery) return;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          console.log("🟢 Geocoding API Found Location:", location);

          onPlaceSelected({
            lat: location.lat,
            lng: location.lng,
          });
        } else {
          console.error("❌ Geocoding API could not find the location.");
        }
      })
      .catch((error) => console.error("❌ Geocoding API error:", error));
  };

  // ✅ `Enter` キーが押された場合は `Geocoding API` を使用
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("🔍 Enter key pressed, using Geocoding API...");
      handleGeocodeSearch(query);
    }
  };

  if (!isLoaded) return <p>Loading search bar...</p>;

  return (
    <Autocomplete
      onLoad={(autoC) => {
        console.log("🟢 Autocomplete Loaded:", autoC);
        autocompleteRef.current = autoC;
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search for a location"
        className={`${styles.barInput}`}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </Autocomplete>
  );
}


