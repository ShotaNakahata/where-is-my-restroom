
"use client";
import React, { useState, useMemo } from "react";
import { useQuery, QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { fetchToilets } from "@/lib/fetchToilets";
import SearchBar from "@/components/MapComponent/SearchBar";
import styles from "@/components/MapComponent/MapComponent.module.css";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
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



