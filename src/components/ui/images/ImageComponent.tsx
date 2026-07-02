import type { ImageProps } from "../../../types/app";
import Link from "../links/Link";

const ImageComponent = ({
  id,
  src,
  alt,
  href,
  width,
  height,
  className,
  loading = "lazy",
  ...rest
}: ImageProps) => {
  const imgElement = (
    <img
      id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      {...rest} // pass through all native <img> props
    />
  );

  // If href is provided, wrap image in <a>
  return href ? <Link href={href}>{imgElement}</Link> : imgElement;
};

export default ImageComponent;
