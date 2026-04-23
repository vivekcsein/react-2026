import { useMemo } from "react";
import { useLocation } from "react-router-dom";
// import useCurrentUrl from "./useCurrentUrl";

const useBreadCrumbs = () => {
  // const fullUrl = useCurrentUrl();
  // const { pathname } = new URL(fullUrl);
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    try {
      const segments = pathname.split("/").filter(Boolean);

      const crumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return { label: decodeURIComponent(segment), href };
      });

      // ✅ Prepend Home route
      return [{ label: "Home", href: "/" }, ...crumbs];
    } catch {
      return [{ label: "Home", href: "/" }];
    }
  }, [pathname]);

  return breadcrumbs;
};

export default useBreadCrumbs;
