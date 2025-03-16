import React from "react";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="w-[200px] h-[370px] border border-gray-200 rounded-md p-3 animate-pulse"
        >
          <div className="w-full h-[200px] bg-gray-300 rounded-md"></div>

          <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
          <div className="mt-2 h-4 w-3/4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
