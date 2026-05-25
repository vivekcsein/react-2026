import { lazy } from "react";
import { headerConfig } from "../../../../packages/configs/config.navigation";

const NavbarDesktop = lazy(() => import("./desktop/NavbarDesktop"));
const NavbarMobile = lazy(() => import("./mobile/NavbarMobile"));

const NavbarPage = () => {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h3 className="center">Desktop Navbar</h3>
        <NavbarDesktop navbar={headerConfig.navbar} isAuthorized={true} />
      </div>
      <div className="mb-4">
        <h3 className="center">Mobile Navbar Left (Default)</h3>
        <NavbarMobile
          navbar={headerConfig.navbar}
          isAuthorized={true}
          navbarId="main-navbar-mobile-left"
          placement="left"
        />
      </div>
      <div className="mb-4">
        <h3 className="center">Mobile Navbar Right</h3>
        <NavbarMobile
          navbar={headerConfig.navbar}
          isAuthorized={true}
          navbarId="main-navbar-mobile-right"
          placement="right"
        />
      </div>
    </section>
  );
};

export default NavbarPage;
