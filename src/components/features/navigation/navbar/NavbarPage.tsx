import { NavbarProvider } from "./NavbarProvider";
import NavbarMobile from "./mobile/NavbarMobile";
import { NavbarDesktop } from "./desktop/NavbarDesktop";
import { headerConfig } from "../../../../packages/configs/config.navigation";

const NavbarPage = () => {
  return (
    <>
      <NavbarProvider>
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
      </NavbarProvider>
    </>
  );
};

export default NavbarPage;
