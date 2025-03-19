"use client";
import React, { createContext, useContext, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";

// ✅ `Google Maps` の `Context` を作成
const GoogleMapsContext = createContext(null);

// ✅ `Google Maps API` をロードする `Provider`
export function GoogleMapsProvider({ children }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const libraries = ["places"]; // ✅ `libraries` を固定化

  // ✅ `useLoadScript` を実行し、一度だけロード
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  // ✅ `useMemo` でロード状態をキャッシュ
  const value = useMemo(() => ({ isLoaded, loadError }), [isLoaded, loadError]);

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

// ✅ `useGoogleMaps` カスタムフックで `isLoaded` を取得
export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}