import React, { useState, useEffect } from "react";

const ResponsiveGrid = ({
  children,
  className = "",
  minItemWidth = 280, // Minimum width for each item
  gap = 24, // Gap between items in pixels
  maxCols = 4, // Maximum number of columns
}) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const calculateColumns = () => {
      const containerWidth = window.innerWidth;
      const availableWidth = containerWidth - 64; // Account for padding
      const itemsPerRow = Math.floor(
        (availableWidth + gap) / (minItemWidth + gap)
      );

      // Limit to max columns and ensure at least 1 column
      const newColumns = Math.min(Math.max(itemsPerRow, 1), maxCols);
      setColumns(newColumns);
    };

    // Calculate on mount
    calculateColumns();

    // Recalculate on resize and orientation change
    const handleResize = () => calculateColumns();
    const handleOrientationChange = () => {
      // Small delay to allow for orientation change to complete
      setTimeout(calculateColumns, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [minItemWidth, gap, maxCols]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
