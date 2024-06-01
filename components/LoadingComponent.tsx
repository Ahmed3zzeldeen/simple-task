import React from 'react';

export default function LoadingComponent(){
  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-700">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};
