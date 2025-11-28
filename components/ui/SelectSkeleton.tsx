import React from 'react';

interface SelectSkeletonProps {
  className?: string;
}

const SelectSkeleton = ({ className = '' }: SelectSkeletonProps) => {
  return (
    <div
      className={`h-[50px] bg-card-background border border-border rounded-xl animate-pulse ${className}`}
    />
  );
};

export default SelectSkeleton;
