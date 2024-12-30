import React from 'react';

interface ImageSkeletonProps {
  allowFooter?: boolean;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ allowFooter = true }) => {
  const getNumberOfItems = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2; 
    if (window.innerWidth < 1024) return 3; 
    return 4; 
  };

  const numberOfItems = getNumberOfItems();

  return (
    <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `repeat(${numberOfItems}, minmax(0, 1fr))` }}>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <div key={index} className="animate-pulse space-y-2">
          <div className="bg-gray-300 rounded-md h-48 w-full"></div>
          {allowFooter && (
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSkeleton;
