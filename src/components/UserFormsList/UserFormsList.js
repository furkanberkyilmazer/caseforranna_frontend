import React, { useState, useEffect } from 'react';

const UserFormsList = ({ token }) => {
  const [forms, setForms] = useState([]);
  const [decodedTokenUserName, setDecodedTokenUserName] = useState(null);

  useEffect(() => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setDecodedTokenUserName(decodedToken.username);

    const fetchForms = async () => {
      try {
        const response = await fetch(`https://localhost:7028/api/Forms/GetByUsernameForms?username=${decodedTokenUserName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Veri çekilemedi.');
        }
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } 
    };

    fetchForms();
  }, [token,forms]);
 
  return (
    <div>
      <h3>User Form List</h3>
      
        <ul>
          {forms.map((form, index) => (
            <li key={index}>
              <p>Subject: {form.subject}</p>
              <p>Content: {form.content}</p>
              <p>Username: {decodedTokenUserName}</p>
            </li>
          ))}
        </ul>
      
    </div>
  );
};

export default UserFormsList;