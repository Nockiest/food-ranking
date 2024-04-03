import React, { useEffect, useState } from 'react';



interface RefreshButtonProps {
  refreshers: any[]; // Define the type of the refreshers prop as an array of any type
}

const Refresher: React.FC<RefreshButtonProps> = ({ refreshers }) => {
  const [refreshKey, setRefreshKey] = useState<number>(0); // Define the type of refreshKey as number

  const handleRefresh = () => {
    // Increment the refreshKey to force a re-render
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    handleRefresh();
  }, [...refreshers]);

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <p>Current key: {refreshKey}</p>
    </div>
  );
};

export default Refresher;