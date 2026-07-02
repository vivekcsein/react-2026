import Link from "../ui/links/Link";
import { Outlet } from "react-router-dom";
import Theme from "../features/navigation/themes/Theme";
import BreadCrumbs from "../features/bread-crumbs/BreadCrumbs";

const AppClientLayout = () => {
  return (
    <div className="layout">
      {/* Header */}
      <header className="header" role="banner">
        <nav className="header-nav" aria-label="Main Navigation">
          <Link href="/">Home</Link>
        </nav>
        <h2 className="header-title">
          Learn React in 2026 by <span className="author">vivekcse</span>
        </h2>

        {/* Theme Switch */}
        <div className="theme-wrapper" aria-label="Theme Toggle">
          <Theme />
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="main-content" role="main">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb">{<BreadCrumbs />}</nav>

        {/* Page Content */}
        <section className="page-content">
          <Outlet />
        </section>
      </main>

      {/* Optional Footer (SEO boost) */}
      <footer className="footer" role="contentinfo">
        <p>© {new Date().getFullYear()} vivekcse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppClientLayout;
