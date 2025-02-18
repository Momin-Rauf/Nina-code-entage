import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Skeleton Cards */}
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-lg p-4 h-40 w-full"
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
