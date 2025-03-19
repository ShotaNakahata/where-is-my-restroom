"use client";
import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // ✅ `libraries` を固定化

export default function SearchBar({ onPlaceSelected }) {
  const [query, setQuery] = useState("");
  const autocompleteRef = useRef(null);

  // ✅ Google Maps API のロードを待つ
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries, 
  });

  useEffect(() => {
    if (!isLoaded || !autocompleteRef.current) return;

    const handlePlaceChanged = () => {
      if (!autocompleteRef.current) {
        console.error("❌ Autocomplete ref is null!");
        return;
      }

      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry) {
        console.error("❌ No place or geometry found!");
        return;
      }

      console.log("🟢 Selected Place:", place);

      // ✅ Google Maps で検索した場所の緯度・経度を `onPlaceSelected` に渡す
      onPlaceSelected({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      setQuery(place.name);
    };

    autocompleteRef.current.addListener("place_changed", handlePlaceChanged);

    return () => {
      autocompleteRef.current.removeListener("place_changed", handlePlaceChanged);
    };
  }, [isLoaded]);

  // ✅ `Enter` を押した際に `getPlace()` を実行する
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("🔍 Enter key pressed, trying to fetch place...");
      if (!autocompleteRef.current) {
        console.error("❌ Autocomplete ref is null!");
        return;
      }

      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry) {
        console.error("❌ No place or geometry found! Trying alternative method...");
        console.log("🔍 Current query:", query);

        // **Alternative method**: Google Maps API の `Geocoding API` を使って検索
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
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

        return;
      }

      console.log("🟢 Enter Key Selected Place:", place);

      onPlaceSelected({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      setQuery(place.name);
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
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </Autocomplete>
  );
}

