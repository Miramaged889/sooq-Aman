import React from "react";
import { useDeviceType } from "../../hooks/useResponsive.js";

const Container = ({
  children,
  className = "",
  maxWidth = "7xl",
  dynamicPadding = true,
}) => {
  const deviceType = useDeviceType();

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  const getPadding = () => {
    if (!dynamicPadding) return "px-4 sm:px-6 lg:px-8";

    switch (deviceType) {
      case "mobile-portrait":
        return "px-3";
      case "mobile-landscape":
        return "px-4";
      case "tablet-portrait":
        return "px-6";
      case "tablet-landscape":
        return "px-8";
      default:
        return "px-4 sm:px-6 lg:px-8";
    }
  };

  return (
    <div
      className={`mx-auto ${getPadding()} ${
        maxWidthClasses[maxWidth]
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
