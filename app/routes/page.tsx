// pages/routes.tsx

import React from 'react';

const RoutesPage = ({ routes }: { routes: string[] }) => {
  return (
    <div>
      <h1>All Routes</h1>
      <ul>
        {/* {routes.map((route, index) => (
          <li key={index}>{route}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default RoutesPage