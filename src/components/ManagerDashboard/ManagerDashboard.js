

import React from 'react';
import FormsList from '../FormsList/FormsList';

const ManagerDashboard = ({ token }) => {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <FormsList token={token}  />
    </div>
  );
};

export default ManagerDashboard;