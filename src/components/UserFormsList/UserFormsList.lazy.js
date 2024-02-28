import React, { lazy, Suspense } from 'react';

const LazyUserFormsList = lazy(() => import('./UserFormsList'));

const UserFormsList = props => (
  <Suspense fallback={null}>
    <LazyUserFormsList {...props} />
  </Suspense>
);

export default UserFormsList;
