import React, { lazy, Suspense } from 'react';

const LazySaveForm = lazy(() => import('./SaveForm'));

const SaveForm = props => (
  <Suspense fallback={null}>
    <LazySaveForm {...props} />
  </Suspense>
);

export default SaveForm;
