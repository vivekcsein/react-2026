import NavbarToggle from "../common/NavbarToggle";
import { useNavbar } from "../NavbarProvider";
import { DrawerLayout } from "./NavbarDrawerLayout";
import { useTheme } from "../../themes/ThemeProvider";
import NavbarDrawerContent from "./NavbarDrawerContent";
import NavigationLogo from "../../../../ui/images/NavigationLogo";
import type { ResolvedThemeMode } from "../../../../../types/app";
import type { DrawerPlacement, HeaderConfig } from "../../../../../types/navigation";
import { filterNavigationActions, filterNavigationItems } from "../common/NavbarCommon";
import { mobileNavbarStyles } from "../../../../../packages/styles/navbar/navbar.mobile";
import { useBodyScrollLock, useDrawerEscape } from "../../../../../packages/hooks/useDrawer";

type NavbarMobileProps = {
  navbarId?: string;
  navbar: HeaderConfig["navbar"];
  isAuthorized?: boolean;
  placement?: DrawerPlacement;
};

const NavbarMobile = ({
  navbarId = "mobile-navbar",
  navbar,
  isAuthorized,
  placement = "left",
}: NavbarMobileProps) => {
  const { resolvedTheme } = useTheme();

  const { isOpen, toggle, close } = useNavbar();

  const open = isOpen(navbarId);

  useBodyScrollLock(open);

  useDrawerEscape(() => close(navbarId), open);

  const navigation = filterNavigationItems(navbar.navigation, isAuthorized);

  const actions = filterNavigationActions(navbar.actions, isAuthorized);

  const styles = mobileNavbarStyles[resolvedTheme as ResolvedThemeMode];

  return (
    <>
      <nav style={styles.root}>
        <div
          style={{
            ...styles.container,

            justifyContent: "space-between",
            flexDirection: placement === "left" ? "row" : "row-reverse",
          }}
        >
          {navbarId && <NavbarToggle open={open} onClick={() => toggle(navbarId as string)} />}

          <div style={styles.logo}>
            <NavigationLogo image={""} title={"vivekcse"} />
          </div>
        </div>
      </nav>

      <DrawerLayout open={open} placement={placement} onClose={() => close(navbarId)}>
        <NavbarDrawerContent
          navbar={navbar}
          navigation={navigation}
          actions={actions}
          onClose={() => close(navbarId)}
          open={open}
          toggle={toggle}
          navbarId={navbarId}
          placement={placement}
        />
      </DrawerLayout>
    </>
  );
};

export default NavbarMobile;
