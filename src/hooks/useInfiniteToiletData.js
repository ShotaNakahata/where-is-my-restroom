// "use client"

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { setToilets } from "@/redux/slices/toiletsSlice";
// import { fetchToilets } from "@/lib/fetchToilets";

// const LIMIT = 12;

// export function useInfiniteToiletData() {
//   const dispatch = useDispatch();

//   const query = useInfiniteQuery({
//     queryKey: ["toilets"],
//     queryFn: async ({ pageParam = 0 }) => {
//       const data = await fetchToilets({ limit: LIMIT, offset: pageParam });
//       return data;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       // すでに取得した件数 = allPages.flat().length
//       const nextOffset = allPages.flat().length;
//       return lastPage.length < LIMIT ? undefined : nextOffset;
//     },
//     onSuccess: (data) => {
//       // すべてのページを統合し Redux に保存
//       const allToilets = data.pages.flat();
//       dispatch(setToilets(allToilets));
//     },
//     staleTime: 300000,
//   });

//   return query;
// }
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToilet } from "@/redux/slices/toiletsSlice"; 
import { fetchToilets } from "@/lib/fetchToilets";

const LIMIT = 12;

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
