import React from 'react';

const AuthImagePattern = ({ title, subTitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`border aspect-square rounded-md bg-secondary/10 ${
                i % 2 === 0 ? 'bg-secondary animate-pulse' : 'bg-primary'
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <h2 className="text-base-content/60">{subTitle}</h2>
      </div>
    </div>
  );
};

export default AuthImagePattern;
