import type { AnimationDirectionType } from "../configs/app.config";

export const findAnimation = (direction: AnimationDirectionType) => {
  switch (direction) {
    case "left":
      return "slideInLeft";
    case "right":
      return "slideInRight";
    case "top":
      return "slideInTop";
    case "bottom":
      return "slideInBottom";
    default:
      return "none";
  }
};
