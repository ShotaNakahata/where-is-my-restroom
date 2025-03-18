import React from 'react'
import styles from "@/app/map/MapPage.module.css";
import { fetchToilets } from "@/lib/fetchToilets";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import MapComponent from "@/components/MapComponent/MapComponent";

async function MapPage() {
  const queryClient = new QueryClient()

  // serverでpreFetch
  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: fetchToilets
  });
  // ✅ キャッシュデータをログ出力
  console.log("🟢 [Server] Prefetched Toilets:", queryClient.getQueryData(["toilets"]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MapComponent />
    </HydrationBoundary>
  )
}

export default MapPage