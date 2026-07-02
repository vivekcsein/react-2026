import Link from "../links/Link";
import ImageComponent from "./ImageComponent";
import type { ImageProps } from "../../../types/app";

interface NavigationImageProps {
  image: ImageProps | string;
  title?: string; // Optional label for the logo
}

const NavigationLogo = ({ image, title }: NavigationImageProps) => {
  let src: string | undefined;
  let alt: string = "Logo";
  let href: string = "/";
  const showLabel = !!title;

  if (typeof image === "object" && image !== null) {
    src = image.src;
    alt = image.alt || alt;
    href = image.href || href;
  } else if (typeof image === "string") {
    src = image;
  }

  return (
    <div className="flex items-center space-x-2">
      <Link className="Header__logo" href={href}>
        {src && <ImageComponent id={`nav-logo-${alt}`} src={src} alt={alt} />}
        {showLabel && <h3>{title}</h3>}
      </Link>
    </div>
  );
};

export default NavigationLogo;
