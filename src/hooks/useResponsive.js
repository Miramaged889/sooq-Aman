import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleOrientationChange = () => {
      // Wait for orientation change to complete
      setTimeout(updateSize, 100);
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return screenSize;
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    typeof window !== "undefined" &&
      window.screen?.orientation?.angle !== undefined
      ? window.screen.orientation.angle === 0 ||
        window.screen.orientation.angle === 180
        ? "portrait"
        : "landscape"
      : "portrait"
  );

  useEffect(() => {
    const updateOrientation = () => {
      if (window.screen?.orientation?.angle !== undefined) {
        const angle = window.screen.orientation.angle;
        setOrientation(angle === 0 || angle === 180 ? "portrait" : "landscape");
      } else {
        // Fallback for browsers without screen.orientation
        setOrientation(
          window.innerHeight > window.innerWidth ? "portrait" : "landscape"
        );
      }
    };

    const handleOrientationChange = () => {
      setTimeout(updateOrientation, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return orientation;
};

export const useBreakpoint = () => {
  const { width } = useScreenSize();

  const getBreakpoint = (width) => {
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  };

  return getBreakpoint(width);
};

export const useResponsiveColumns = ({
  minItemWidth = 280,
  gap = 24,
  maxCols = 4,
  containerPadding = 64,
}) => {
  const { width } = useScreenSize();
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const availableWidth = width - containerPadding;
    const itemsPerRow = Math.floor(
      (availableWidth + gap) / (minItemWidth + gap)
    );
    const newColumns = Math.min(Math.max(itemsPerRow, 1), maxCols);

    setColumns(newColumns);
  }, [width, minItemWidth, gap, maxCols, containerPadding]);

  return columns;
};

export const useDeviceType = () => {
  const { width } = useScreenSize();
  const orientation = useOrientation();

  const getDeviceType = () => {
    if (width < 768) {
      return orientation === "portrait"
        ? "mobile-portrait"
        : "mobile-landscape";
    }
    if (width < 1024) {
      return orientation === "portrait"
        ? "tablet-portrait"
        : "tablet-landscape";
    }
    return "desktop";
  };

  return getDeviceType();
};
