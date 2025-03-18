"use client"
import React, { useMemo } from 'react'
import { useQuery } from "@tanstack/react-query";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { fetchToilets } from "@/lib/fetchToilets";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
// デフォルトの中心座標（Osaka）
const defaultCenter = {
  lat: 34.6937,
  lng: 135.5023,
};

function MapComponent() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey });

  const { data: toilets } = useQuery({
    queryKey: ["toilets"],
    queryFn: fetchToilets,
    staleTime: 1000 * 60 * 5,
  });

  const memoizedMap = useMemo(() => {
    if (!isLoaded) return null
    return (
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={defaultCenter}>
        {toilets.map((toilet) => {
          <Marker key={toilet._id} position={{ lat: toilet.lat, lng: toilet.lng }} />
        })}
      </GoogleMap>
    )
  });
  if (loadError) return <p>マップを読み込めませんでした。</p>;
  if (!isLoaded) return <p>読み込み中...</p>;
  return memoizedMap
}

export default MapComponent