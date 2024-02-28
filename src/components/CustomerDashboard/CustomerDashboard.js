import React , { useState } from 'react';
import SaveForm from '../SaveForm/SaveForm';
import UserFormsList from '../UserFormsList/UserFormsList';

const CustomerDashboard = ({ token }) => {
  const [refreshList, setRefreshList] = useState(false);

  const handleFormSaved = () => {
    // Yeni bir form eklendiğinde UserFormsList bileşenini yeniden yüklemek için refreshList'i güncelle
    setRefreshList(prevState => !prevState);
  };
  return (
    <div>
      <h2>Welcome, Customer!</h2>
      <SaveForm token={token} onFormSaved={handleFormSaved} />
      <UserFormsList token={token} key={refreshList}/>
    </div>
  );
};

export default CustomerDashboard;