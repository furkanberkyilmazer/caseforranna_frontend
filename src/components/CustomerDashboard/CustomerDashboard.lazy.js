import React, { lazy, Suspense } from 'react';

const LazyCustomerDashboard = lazy(() => import('./CustomerDashboard'));

const CustomerDashboard = props => (
  <Suspense fallback={null}>
    <LazyCustomerDashboard {...props} />
  </Suspense>
);

export default CustomerDashboard;
