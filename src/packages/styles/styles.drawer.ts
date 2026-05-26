import type { CSSProperties } from "react";
import type { RefinedXPosition } from "../../types/app";

export const drawerKeyframes = `
@keyframes drawer-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes drawer-left {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes drawer-right {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
`;

export const getDrawerStyles = (placement: RefinedXPosition): CSSProperties => {
  return {
    position: "absolute",
    top: 0,
    bottom: 0,
    [placement]: 0,
    width: "80vw",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    background: "hsl(var(--background))",
    borderRight: placement === "left" ? "1px solid hsl(var(--border))" : undefined,
    borderLeft: placement === "right" ? "1px solid hsl(var(--border))" : undefined,

    animation: placement === "left" ? "drawer-left 0.2s ease" : "drawer-right 0.2s ease",
  };
};
