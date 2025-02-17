import React from 'react';

const Spinner = ({ size = 'w-8 h-8', color = 'text-blue-500' , className="" }) => {
  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${size} ${color} ${className} border-4 border-t-4 border-gray-200 border-t-current rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;