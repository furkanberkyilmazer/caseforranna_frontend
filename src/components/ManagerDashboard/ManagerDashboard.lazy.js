import React, { lazy, Suspense } from 'react';

const LazyManagerDashboard = lazy(() => import('./ManagerDashboard'));

const ManagerDashboard = props => (
  <Suspense fallback={null}>
    <LazyManagerDashboard {...props} />
  </Suspense>
);

export default ManagerDashboard;
