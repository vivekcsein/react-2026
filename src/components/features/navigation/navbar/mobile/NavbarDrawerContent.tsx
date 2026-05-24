import { NavbarItem } from "../common/NavbarItem";
import NavbarToggle from "../common/NavbarToggle";
import { NavbarAction } from "../common/NavbarAction";
import NavigationLogo from "../../../../ui/images/NavigationLogo";
import { mobileNavbarStyles } from "../../../../../packages/styles/navbar/navbar.mobile";

import type {
  DrawerPlacement,
  NavbarConfig,
  NavigationAction,
  NavigationItem,
} from "../../../../../types/navigation";

type NavbarDrawerContentProps = {
  navbar: NavbarConfig;
  navigation: NavigationItem[];
  actions?: NavigationAction[];
  navbarId?: string;
  open: boolean;
  onClose: () => void;
  toggle: (navbarId: string) => void;
  placement: DrawerPlacement;
};

const NavbarDrawerContent = ({
  navbar,
  navigation,
  actions,
  navbarId,
  open,
  onClose,
  toggle,
  placement,
}: NavbarDrawerContentProps) => {
  return (
    <>
      {/* Navbar Mobile Menu */}
      <div
        style={{
          height: 64,
          padding: "0 var(--space-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 10px hsl(var(--foreground) / 0.05)",
          borderBottom: "1px solid hsl(var(--border))",
          backdropFilter: "blur(12px)",
          flexDirection: placement === "left" ? "row" : "row-reverse",
        }}
      >
        {navbarId && <NavbarToggle open={open} onClick={() => toggle(navbarId as string)} />}
        <NavigationLogo image={""} title={"vivekcse"} />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--space-2)",
        }}
      >
        {/* Only render navigation if there are any */}
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-between",
            gap: 4,
            listStyle: "none",
            margin: 0,
            padding: "8px 16px",
          }}
        >
          {navigation.map((item) => (
            <li key={item.id}>
              <NavbarItem
                item={item}
                styles={mobileNavbarStyles.dark}
                active={navbar.activeItemId === item.id}
                onClick={() => {
                  item.onClick?.();
                  navbar.onNavigationChange?.(item);
                  onClose();
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Only render actions if there are any */}
      {actions?.length && (
        <div
          style={{
            padding: "var(--space-2)",
            paddingTop: "var(--space-2)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid hsl(var(--border))",
            backdropFilter: "blur(12px)",
            boxShadow: "0 -2px 10px hsl(var(--foreground) / 0.05)",
          }}
        >
          {actions?.map((action) => (
            <NavbarAction key={action.id} action={action} />
          ))}
        </div>
      )}
    </>
  );
};

export default NavbarDrawerContent;
