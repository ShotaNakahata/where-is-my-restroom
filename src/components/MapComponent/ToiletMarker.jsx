"use client";
import React, { useMemo } from "react";
import { Marker } from "@react-google-maps/api";

export default function ToiletMarker({ toilet }) {
  const markerIcon = useMemo(() => {
    const color = toilet.isUniversal ? "#001eff" : "#f60b0b"; // 緑 or 青
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
          <path fill="${color}" stroke="#000000" stroke-width="0.5"
            d="M12 2C8.1 2 5 5.1 5 9c0 4 5 10 6 11 1-1 6-7 6-11 0-3.9-3.1-7-7-7zm0 9c-1.1 0-2-.9-2-2s.9-2 
            2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(40, 40), // サイズ調整
    };
  }, [toilet.isUniversal]);

  const lat = parseFloat(toilet.latitude);
  const lng = parseFloat(toilet.longitude);
  if (isNaN(lat) || isNaN(lng)) return null;

  return <Marker position={{ lat, lng }} icon={markerIcon} />;
}
