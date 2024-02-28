import React, { useState } from 'react';

const SaveForm = ({ token }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7028/api/Forms/SaveForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, content,username:getUsernameFromToken(token)}),
      });
      if (response.ok) {
        setSuccess(true);
        setSubject('');
        setContent('');
      } else {
        setSuccess(false);
        setError('Failed to save form');
      }
    } catch (error) {
      console.error('Save form error:', error);
      setSuccess(false);
      setError('Failed to save form');
    } finally {
      setLoading(false);
    }
  };
   const getUsernameFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      return decodedToken.username; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  return (
    <div>
      <h3>Save Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', minHeight: '100px' }}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>Save</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {success && <p>Form saved successfully!</p>
      
        }
      </form>
    </div>
  );
};

export default SaveForm;