'use client'
import React, { useEffect, useState } from 'react';

// Define a type guard function to check if a value is a React.DependencyList
function isDependencyList(value: any): value is React.DependencyList {
  return Array.isArray(value) &&
    value.every(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null || typeof item === 'undefined');
}

interface RefreshButtonProps {
  refreshers: ReadonlyArray<unknown | (() => void) | React.DependencyList>;
}

const Refresher: React.FC<RefreshButtonProps> = ({ refreshers }) => {
  const [refreshKey, setRefreshKey] = useState<number>(0); // Define the type of refreshKey as number

  const handleRefresh = () => {
    // Increment the refreshKey to force a re-render
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    handleRefresh();
  }, refreshers.filter(isDependencyList) as React.DependencyList); // Filter out only the values that are of type React.DependencyList

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <p>Current key: {refreshKey}</p>
    </div>
  );
};

export default Refresher;
