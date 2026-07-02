// =========================================================
//  SEARCH HOOK (Optimized & Minimal)
// It cache data when call api on first then filter out according to query
//  =========================================================

import { useEffect, useMemo, useRef, useState } from "react";
import useHttp from "../hooks/useHttp";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/local-storage.utils";

interface UseSearchProps<T> {
  key: string;
  url: string;
  filterFn: (item: T, query: string) => boolean;
  limit?: number;
  ttl?: number;
}

export const useSearch = <T>({
  key,
  url,
  filterFn,
  limit = 5,
  ttl = 1000 * 60 * 5,
}: UseSearchProps<T>) => {
  const { data, isLoading, error, execute } = useHttp<T[]>();

  const STORAGE_KEY = `search-cache-${key}`;
  const hasFetched = useRef(false);

  // ✅ Lazy init (correct)
  const [items] = useState<T[]>(() => {
    const cached = getLocalStorageItem<{
      data: T[];
      timestamp: number;
    }>(STORAGE_KEY);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    return [];
  });

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(limit);

  // ✅ Fetch (no cascade)
  useEffect(() => {
    if (!items.length && !hasFetched.current) {
      hasFetched.current = true;
      execute({ url });
    }
  }, [items.length, execute, url]);

  // ✅ Sync ONLY external system (localStorage)
  useEffect(() => {
    if (data?.length) {
      setLocalStorageItem(STORAGE_KEY, {
        data,
        timestamp: Date.now(),
      });
    }
  }, [data, STORAGE_KEY]);

  // ✅ Derived items (NO setState)
  const finalItems = useMemo(() => {
    return data?.length ? data : items;
  }, [data, items]);

  // ✅ Filter
  const filteredItems = useMemo(() => {
    if (!query.trim()) return finalItems;
    return finalItems.filter((item) => filterFn(item, query));
  }, [finalItems, query, filterFn]);

  // ✅ Reset pagination WITHOUT effect
  const effectiveVisibleCount = useMemo(() => {
    return query ? limit : visibleCount;
  }, [query, limit, visibleCount]);

  // ✅ Visible items
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, effectiveVisibleCount);
  }, [filteredItems, effectiveVisibleCount]);

  const loadMore = () => setVisibleCount((prev) => prev + limit);

  return {
    query,
    setQuery,
    isLoading,
    error,
    items: visibleItems,
    total: filteredItems.length,
    hasMore: effectiveVisibleCount < filteredItems.length,
    loadMore,
  };
};
