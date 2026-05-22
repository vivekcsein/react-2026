import Link from "../../ui/Link";
import { getRouteByKey } from "../../../packages/configs/config.router";

const NavigationPage = () => {
  const currentRoute = getRouteByKey("NAVIGATION");

  return (
    <div className="container-xl">
      <div className="text-header">
        <h4>{currentRoute?.description}</h4>
      </div>
      <div className="app-grid">
        {!currentRoute && <p>No auth routes found.</p>}

        {currentRoute?.children?.map((app) => {
          // ✅ compute without touching readonly config
          const fullPath = `/${currentRoute.path}/${app.path}`.replace(/\/+/g, "/");

          return (
            <Link key={app.key} href={fullPath} className="card">
              <h4>{app.title}</h4>
              <p>{app.description || "No description available."}</p>
              <span className="app-card-action">Open →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPage;
