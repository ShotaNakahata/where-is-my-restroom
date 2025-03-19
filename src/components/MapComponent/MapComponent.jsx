// "use client"
// import React, { useMemo } from 'react'
// import { useQuery } from "@tanstack/react-query";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { fetchToilets } from "@/lib/fetchToilets";
// import SearchBar from "@/components/MapComponent/SearchBar";
// import styles from "@/components/MapComponent/MapComponent.module.css";

// const mapContainerStyle = {
//   width: "100%",
//   height: "50vh",
// };
// // デフォルトの中心座標（Osaka）
// const defaultCenter = {
//   lat: 34.6937,
//   lng: 135.5023,
// };

// function MapComponent() {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//   const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey });

//   const { data: toilets } = useQuery({
//     queryKey: ["toilets"],
//     queryFn: () => fetchToilets(),
//     staleTime: 1000 * 60 * 5,
//   });

//   console.log("🟢From MapComponent [toilets]", toilets)

//   const memoizedMap = useMemo(() => {
//     if (!isLoaded) return null
//     return (
//       <div className={`${styles.mapWrapper}`}>
//         <SearchBar />
//         <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={defaultCenter}>
//           {toilets.map((toilet) => {
//             // 🛠 `lat` / `lng` を `parseFloat()` で数値型に変換
//             const lat = parseFloat(toilet.latitude);
//             const lng = parseFloat(toilet.longitude);

//             // 🛠 `lat` / `lng` が有効な数値かチェック
//             if (isNaN(lat) || isNaN(lng)) {
//               console.error(`❌ 無効な緯度経度:`, toilet);
//               return null; // 無効なデータはスキップ
//             }
//             return <Marker key={toilet._id} position={{ lat, lng }} />
//           })}
//         </GoogleMap>
//       </div>
//     )
//   });
//   if (loadError) return <p>マップを読み込めませんでした。</p>;
//   if (!isLoaded) return <p>読み込み中...</p>;
//   return memoizedMap
// }

// export default MapComponent;;
"use client";
import React, { useState, useMemo } from "react";
import { useQuery, QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { fetchToilets } from "@/lib/fetchToilets";
import SearchBar from "@/components/MapComponent/SearchBar";
import styles from "@/components/MapComponent/MapComponent.module.css";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const defaultCenter = {
  lat: 34.6937,
  lng: 135.5023,
};

const libraries = ["places"]; // ✅ `libraries` を固定化

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["toilets"], 
    queryFn: ()=>fetchToilets(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function MapComponent() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries, // ✅ 修正: `libraries` を固定
  });

  const { data: toilets } = useQuery({
    queryKey: ["toilets"],
    queryFn: fetchToilets,
    staleTime: 1000 * 60 * 5,
  });

  console.log("🟢 From MapComponent - Toilets:", toilets);
  console.log("🟢 From MapComponent - Selected Location:", selectedLocation);

  const memoizedMap = useMemo(() => {
    if (!isLoaded) return null;
    return (
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={selectedLocation}>
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
      <SearchBar onPlaceSelected={(location) => {
        console.log("🟢 Updating Center to:", location);
        setSelectedLocation(location);
      }} />
      {isLoaded ? memoizedMap : <p>Loading map...</p>}
    </div>
  );
}

export default MapComponent;



