import { useMemo } from "react";
import Link from "../../ui/links/Link";
import useBreadCrumbs from "../../../packages/hooks/useBreadCrumbs";

const BreadCrumbs = () => {
  const breadcrumbs = useBreadCrumbs();

  // ✅ Hide breadcrumbs completely on homepage
  const isHome = breadcrumbs.length === 1 && breadcrumbs[0].href === "/";

  // ✅ Memoized items
  const items = useMemo(() => {
    return breadcrumbs.map((crumb, idx) => {
      const isLast = idx === breadcrumbs.length - 1;

      return (
        <li key={crumb.href} className="breadcrumb-item">
          {isLast ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="breadcrumb-link">
              {crumb.label}
            </Link>
          )}

          {!isLast && <span className="breadcrumb-separator">/</span>}
        </li>
      );
    });
  }, [breadcrumbs]);

  // ❌ Don't render anything on homepage
  if (isHome) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">{items}</ol>
    </nav>
  );
};

export default BreadCrumbs;
