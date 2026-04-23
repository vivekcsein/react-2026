import { useCallback, useEffect, useRef } from "react";

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const useHighlight = (query: string) => {
  const cache = useRef<Map<string, React.ReactNode>>(new Map());

  // clear cache when query changes
  useEffect(() => {
    cache.current.clear();
  }, [query]);

  const highlight = useCallback(
    (text: string) => {
      if (!query.trim()) return text;

      const key = `${text}-${query}`;

      if (cache.current.has(key)) {
        return cache.current.get(key);
      }

      const safeQuery = escapeRegExp(query);
      const regex = new RegExp(`(${safeQuery})`, "gi");

      const result = text.split(regex).map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="highlight">
            {part}
          </mark>
        ) : (
          part
        ),
      );

      cache.current.set(key, result);

      return result;
    },
    [query],
  );

  return highlight;
};
