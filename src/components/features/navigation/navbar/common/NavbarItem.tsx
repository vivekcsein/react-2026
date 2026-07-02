"use client";
import Link from "../../../../ui/links/Link";
import Button from "../../../../ui/buttons/Button";
import { NavigationIcon } from "./NavbarCommon";
import type { NavigationItem } from "../../../../../types/navigation";
import type { NavbarStyles } from "../../../../../packages/styles/navbar/navbar.desktop";

type NavbarItemProps = {
  item: NavigationItem;
  active?: boolean;
  styles: NavbarStyles;
  onClick?: () => void;
};

export const NavbarItem = ({ item, active, styles, onClick }: NavbarItemProps) => {
  const content = (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <NavigationIcon icon={item.icon} />

      {!item.icon?.only && <span>{item.label}</span>}

      {item.badge && <span style={styles.badge}>{item.badge.value}</span>}
    </div>
  );

  const style = {
    ...styles.navigationItem,

    ...(active ? styles.navigationItemActive : {}),
  };

  if (item.href) {
    return <Link href={item.href}>{content}</Link>;
  }

  return (
    <Button type="button" style={style} onClick={onClick}>
      {content}
    </Button>
  );
};
