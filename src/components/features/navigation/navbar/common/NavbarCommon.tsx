// "use client";

import Lucid_Icon from "../../../../ui/images/Lucid_Icon";
import type { NavigationAction, NavigationItem } from "../../../../../types/navigation";

// Access Control
// eslint-disable-next-line react-refresh/only-export-components
export const canAccessNavigation = (
  visibility?: NavigationItem["authVisibility"],
  isAuthorized?: boolean,
) => {
  switch (visibility) {
    case "authorizedOnly":
      return isAuthorized;

    case "unauthorizedOnly":
      return !isAuthorized;

    default:
      return true;
  }
};

// Navigation Filter

// eslint-disable-next-line react-refresh/only-export-components
export const filterNavigationItems = (items: NavigationItem[], isAuthorized?: boolean) => {
  return items.filter((item) => canAccessNavigation(item.authVisibility, isAuthorized));
};

// eslint-disable-next-line react-refresh/only-export-components
export const filterNavigationActions = (
  actions: NavigationAction[] = [],
  isAuthorized?: boolean,
) => {
  return actions.filter((action) => canAccessNavigation(action.authVisibility, isAuthorized));
};

// Icon Renderer

type NavigationIconProps = {
  icon?: NavigationItem["icon"];
};

export const NavigationIcon = ({ icon }: NavigationIconProps) => {
  if (!icon || icon.hidden) {
    return null;
  }

  if (typeof icon.node === "string") {
    return <Lucid_Icon iconName={icon.node} />;
  }

  return icon.node;
};
