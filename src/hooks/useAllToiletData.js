"use client";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setToilets } from "@/redux/slices/toiletsSlice";
import { fetchToilets } from "@/lib/fetchToilets";
import { useEffect } from "react";

export function useAllToiletData() {
  const dispatch = useDispatch();
  const isFullFetched = useSelector((state) => state.toilets.isFullDataFetched);

  const { data, ...restQuery } = useQuery({
    queryKey: ["toilets-map"],
    queryFn: fetchToilets,
    staleTime: 1000 * 60 * 10,
  });

  // ✅ data が取得されたタイミングで dispatch を実行
  useEffect(() => {
    if (data && !isFullFetched) {
      dispatch(setToilets(data));
    }
  }, [data, isFullFetched, dispatch]);

  return { data, ...restQuery };
}
