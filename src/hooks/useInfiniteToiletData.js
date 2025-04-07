"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToilet } from "@/redux/slices/toiletsSlice"; 
import { fetchToilets } from "@/lib/fetchToilets";

const LIMIT = 8;

export function useInfiniteToiletData() {
  const dispatch = useDispatch();

  const query = useInfiniteQuery({
    queryKey: ["toilets-list"], // ✅ queryKey も分離
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchToilets({ limit: LIMIT, offset: pageParam });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.flat().length;
      return lastPage.length < LIMIT ? undefined : nextOffset;
    },
    onSuccess: (data) => {
      const allToilets = data.pages.flat();
      dispatch(addToilet(allToilets)); // ✅ 追加型に変更
    },
    staleTime: 300000,
  });

  return query;
}
