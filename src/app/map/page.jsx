import React from "react";
import { fetchToilets } from "@/lib/fetchToilets";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import MapPageUI from "@/components/MapComponent/MapPageUI";

// ✅ `server-side fetching` を `getServerSideProps` なしで実装
export default async function MapPage() {
  const queryClient = new QueryClient();

  // ✅ `server-side` で `fetchToilets()` を直接実行してデータを取得
  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: ()=>fetchToilets(),
  });

  const dehydratedState = dehydrate(queryClient); // ✅ `client-side` に渡すキャッシュデータ

  return (
    <HydrationBoundary state={dehydratedState}>
      <MapPageUI />
    </HydrationBoundary>
  );
}
