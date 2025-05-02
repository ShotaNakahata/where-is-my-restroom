import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ListPageClient from "@/components/toilet/ListPageClient";
import { fetchToilets } from "@/lib/fetchToilets";

const LIMIT = 8;

export default async function ToiletListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["toilets-list"], 
    queryFn: ({ pageParam = 0 }) => fetchToilets({ limit: LIMIT, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.flat().length;
      return lastPage.length < LIMIT ? undefined : nextOffset;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListPageClient />
    </HydrationBoundary>
  );
}
