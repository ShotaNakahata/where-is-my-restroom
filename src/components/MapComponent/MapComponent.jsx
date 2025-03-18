"use client"
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchToilets } from "@/lib/fetchToilets";

function MapComponent() {
  const { data: toilets } = useQuery({
    queryKey: ["toilets"],
    queryFn: fetchToilets,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div>MapComponent</div>
  )
}

export default MapComponent