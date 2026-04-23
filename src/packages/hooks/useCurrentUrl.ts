import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useCurrentUrl = (): string => {
  const location = useLocation();

  const currentUrl = useMemo(() => {
    return `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  }, [location]);

  return currentUrl;
};

export default useCurrentUrl;
