// "use client";
import { NavbarItem } from "../common/NavbarItem";
import { NavbarAction } from "../common/NavbarAction";
import { useTheme } from "../../themes/ThemeProvider";
import type { ThemeMode } from "../../../../../types/app";
import NavigationLogo from "../../../../ui/images/NavigationLogo";
import type { NavbarConfig } from "../../../../../types/navigation";
import { navbarStyles } from "../../../../../packages/styles/navbar/navbar.desktop";
import { filterNavigationActions, filterNavigationItems } from "../common/NavbarCommon";

type NavbarDesktopProps = {
  navbar: NavbarConfig;
  isAuthorized?: boolean;
};

const NavbarDesktop = ({ navbar, isAuthorized }: NavbarDesktopProps) => {
  const { theme } = useTheme() as {
    theme: Exclude<ThemeMode, "system">;
  };

  const styles = navbarStyles[theme];

  const navigation = filterNavigationItems(navbar.navigation, isAuthorized);

  const actions = filterNavigationActions(navbar.actions, isAuthorized);

  return (
    <nav style={styles.root}>
      <div style={styles.container}>
        {navbar.logo && (
          <div style={styles.logo}>
            <NavigationLogo image={navbar.logo} title={"vivekcse"} />
          </div>
        )}

        <ul style={styles.navigation}>
          {navigation.map((item) => (
            <li key={item.id}>
              <NavbarItem
                item={item}
                active={navbar.activeItemId === item.id}
                styles={styles}
                onClick={() => {
                  item.onClick?.();

                  navbar.onNavigationChange?.(item);
                }}
              />
            </li>
          ))}
        </ul>

        {!!actions?.length && (
          <div style={styles.actions}>
            {actions.map((action) => (
              <NavbarAction key={action.id} action={action} />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarDesktop;
