"use client";
import Link from "../../../../ui/links/Link";
import Button from "../../../../ui/buttons/Button";
import { NavigationIcon } from "./NavbarCommon";
import type { NavigationAction } from "../../../../../types/navigation";

type NavbarActionProps = {
  action: NavigationAction;
};

export const NavbarAction = ({ action }: NavbarActionProps) => {
  const content = (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <NavigationIcon icon={action.icon} />
      {!action.icon?.only && <span>{action.label}</span>}
    </div>
  );

  if (action.href) {
    return <Link href={action.href}>{content}</Link>;
  }

  return (
    <Button type="button" onClick={action.onClick}>
      {content}
    </Button>
  );
};
