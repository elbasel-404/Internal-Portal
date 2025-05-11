"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

export const WrappedImage: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  ...rest
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Image src={src} width={width} height={height} {...rest} alt={alt} />
    </div>
  );
};
