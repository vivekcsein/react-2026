import NavbarToggle from "../common/NavbarToggle";
import { useTheme } from "../../themes/ThemeProvider";
import NavbarMobileContent from "./NavbarMobileContent";
import { useNavigationFeature } from "../../NavigationProvider";
import NavigationLogo from "../../../../ui/images/NavigationLogo";
import { DrawerLayout } from "../../../../ui/drawer/DrawerLayout";
import type { HeaderConfig } from "../../../../../types/navigation";
import type { RefinedXPosition, ResolvedThemeMode } from "../../../../../types/app";
import { filterNavigationActions, filterNavigationItems } from "../common/NavbarCommon";
import { mobileNavbarStyles } from "../../../../../packages/styles/navbar/navbar.mobile";
import { useBodyScrollLock, useDrawerEscape } from "../../../../../packages/hooks/useDrawer";

type NavbarMobileProps = {
  navbarId?: string;
  navbar: HeaderConfig["navbar"];
  isAuthorized?: boolean;
  position?: RefinedXPosition;
};

const NavbarMobile = ({
  navbarId = "mobile-navbar",
  navbar,
  isAuthorized,
  position = "left",
}: NavbarMobileProps) => {
  const { resolvedTheme } = useTheme();

  const { isOpen, close, toggle } = useNavigationFeature();

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
            flexDirection: position === "left" ? "row" : "row-reverse",
          }}
        >
          {navbarId && <NavbarToggle open={open} onClick={() => toggle(navbarId as string)} />}

          <div style={styles.logo}>
            <NavigationLogo image={""} title={"vivekcse"} />
          </div>
        </div>
      </nav>

      <DrawerLayout open={open} position={position} onClose={() => close(navbarId)}>
        <NavbarMobileContent
          navbar={navbar}
          navigation={navigation}
          actions={actions}
          onClose={() => close(navbarId)}
          open={open}
          toggle={() => toggle(navbarId as string)}
          navbarId={navbarId}
          position={position}
        />
      </DrawerLayout>
    </>
  );
};

export default NavbarMobile;
