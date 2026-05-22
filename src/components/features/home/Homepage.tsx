import { useMemo } from "react";
import Link from "../../ui/Link";
import { routeConfig } from "../../../packages/configs/config.router";

const HomePage = () => {
  // ✅ Filter valid routes only
  const apps = useMemo(() => {
    return routeConfig.filter((route) => {
      // exclude HomePage
      if (route.path === "/") return false;

      // exclude wildcard / not found
      if (route.path === "*" || route.path?.includes("*")) return false;

      // exclude routes without title (optional rule)
      if (!route.title) return false;

      return true;
    });
  }, []);

  return (
    <div className="container p-2">
      <div className="text-header">
        <h4>Explore different features and mini apps</h4>
      </div>

      <div className="app-grid">
        {apps.map((app) => (
          <Link key={app.key} href={app.path} className="card">
            <h4>{app.title}</h4>
            <p>{app.description || "No description available."}</p>
            <span className="card-action">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
