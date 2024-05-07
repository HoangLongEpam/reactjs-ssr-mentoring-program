// ImageWithFallback.tsx
import { ImgHTMLAttributes, useState } from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<any> {
  fallback?: string;
}

export function ImageWithFallback({
  fallback = "https://hips.hearstapps.com/hmg-prod/images/legacy-fre-image-placeholder-1645192942.png?resize=980:*",
  src,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const onError = () => setImgSrc(fallback);

  return <img className="w-[288px] h-[432px]" src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}
