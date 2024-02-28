import React from 'react';
import SaveForm from '../SaveForm/SaveForm';
import UserFormsList from '../UserFormsList/UserFormsList';

const CustomerDashboard = ({ token }) => {
  return (
    <div>
      <h2>Welcome, Customer!</h2>
      <SaveForm token={token} />
      <UserFormsList token={token} />
    </div>
  );
};

export default CustomerDashboard;