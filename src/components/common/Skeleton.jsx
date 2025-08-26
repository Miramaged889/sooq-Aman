import React from 'react';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  ...props
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    text: 'h-4',
    title: 'h-6',
    avatar: 'h-12 w-12 rounded-full',
    image: 'h-48 w-full',
    card: 'h-64 w-full',
    button: 'h-10 w-24',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  const style = {
    width: width,
    height: height,
  };

  return (
    <div className={classes} style={style} {...props} />
  );
};

// Skeleton components for common patterns
export const SkeletonCard = () => (
  <div className="card p-4 space-y-3">
    <Skeleton variant="image" className="h-48" />
    <Skeleton variant="title" className="w-3/4" />
    <Skeleton variant="text" className="w-full" />
    <Skeleton variant="text" className="w-2/3" />
    <div className="flex justify-between items-center">
      <Skeleton variant="button" />
      <Skeleton variant="text" className="w-16" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="title" className="w-1/2" />
          <Skeleton variant="text" className="w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
