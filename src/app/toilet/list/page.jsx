import { fetchToilets } from "@/lib/fetchToilets";
import ListPageClient from "@/components/toilet/ListPageClient";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";

async function ToiletListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: ()=>fetchToilets(),
  });

  console.log("🟢 [Server] Prefetched Toilets:", queryClient.getQueryData(["toilets"])); // ✅ キャッシュデータをログ出力

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListPageClient />
    </HydrationBoundary>
  );
}

export default ToiletListPage;
