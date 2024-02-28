import React, { useState, useEffect } from 'react';
import '../FormsList/FormsList.css';

const FormsList = ({ token }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:7028/api/Forms/AllForms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [token]);

  const handleStatusChange = async (formId,formSub,formCont, newStatus) => {
    try {
        console.log(formId + formSub +formCont+ newStatus)
      const response = await fetch('https://localhost:7028/api/Forms/UpdateForm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: formId,
          subject:formSub,
          content:formCont,
          state: newStatus
        }),
      });
      if (response.ok) {
        const updatedForms = forms.map(form => {
          if (form.id === formId) {
            return { ...form, state: newStatus };
          }
          return form;
        });
        setForms(updatedForms);
      } else {
        console.error('Failed to update form');
      }
    } catch (error) {
      console.error('Update form error:', error);
    }
  };
  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return 'Action Taken';
      case 1:
        return 'Not Action Taken';
      case 2:
        return 'Deleted';
      default:
        return '';
    }
  };

  return (
    <div>
      <h3>Forms List</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id} className="list-item">
              <div className="details-container">
                <div>
                  <p><strong>Subject:</strong> {form.subject}</p>
                  <p><strong>Content:</strong> {form.content}</p>
                  <p><strong>Created:</strong> {form.user.username}</p>
                </div>
                <div>
                  <p><strong>Status:</strong> {getStatusLabel(form.state)}</p>
                  <div className="button-container">
                    <button className="button" onClick={() => handleStatusChange(form.id, form.subject, form.content, 0)}>Action Taken</button>
                    <button className="button" onClick={() => handleStatusChange(form.id, form.subject, form.content, 1)}>Not Action Taken</button>
                    <button className="button" onClick={() => handleStatusChange(form.id, form.subject, form.content, 2)}>Deleted</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FormsList;