"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/MapLoader";
import styles from "@/components/MapComponent/MapComponent.module.css";
import SearchBar from "@/components/MapComponent/SearchBar";
import ToiletMarker from "@/components/MapComponent/ToiletMarker";
import ToiletModal from "@/components/common/ToiletModal";
import { useDisableScroll } from "@/utils/useDisableScroll";
import { fetchToilets } from "@/lib/fetchToilets";
import { useDispatch, useSelector } from "react-redux";
import { setToilets } from "@/redux/slices/toiletsSlice";

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
  const [selectedToilet, setSelectedToilet] = useState(null);
  const dispatch = useDispatch();
  useDisableScroll(selectedToilet);
  const { isLoaded, loadError } = useGoogleMaps(); // ✅ `Google Maps API` のロード状態を取得

  const { data } = useQuery({
    queryKey: ["toilets"],
    queryFn: () => fetchToilets(),
    staleTime: 1000 * 60 * 5,
    // onSuccess: (data) => {
    //   dispatch(setToilets(data));
    // }
  });
  useEffect(()=>{
      dispatch(setToilets(data));
    },[data, dispatch]);
  const { toilets } = useSelector((state) => state.toilets)

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
          return <ToiletMarker key={toilet._id} toilet={toilet} onClick={() => setSelectedToilet(toilet)} />;
        })}
      </GoogleMap>
    );
  }, [isLoaded, selectedLocation, toilets]);

  if (loadError) return <p>Failed to load the map.</p>;

  return (
    <div className={`${styles.mapWrapper}`}>
      <SearchBar onPlaceSelected={setSelectedLocation} />
      {isLoaded ? memoizedMap : <p>Loading map...</p>}
      {selectedToilet && <ToiletModal toilet={selectedToilet} btnMessage="close" onClose={() => setSelectedToilet(null)} />}
    </div>
  );
}

export default MapComponent;




