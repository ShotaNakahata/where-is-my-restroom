import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ListPageClient from "@/components/toilet/ListPageClient";
import { fetchToilets } from "@/lib/fetchToilets";

export default async function ToiletListPage() {
  const queryClient = new QueryClient();

  // 🔍 SSR中にデータをプリフェッチ
  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: fetchToilets,
  });

  // ✅ Server側でデータ確認用ログ（開発中のみ）
  console.log("🟢 [Server] Prefetched Toilets:", queryClient.getQueryData(["toilets"]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListPageClient />
    </HydrationBoundary>
  );
}

