import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Logo from '../pages/Logo.jpg';

function HomePage() {
  const [formData, setFormData] = useState({
    newPart: '',
    oldPart: '',
    line: '',
    stn: '',
    unitNumber: '',
    description: '',
    picture: null,
  });

  const [submittedItems, setSubmittedItems] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    setSubmittedItems((prev) => [...prev, formData.newPart]);
    setFormData({ ...formData, newPart: '' });
    navigate('/search');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`form-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <form id="ec-verification-form" onSubmit={handleSubmit}>
        {/* User Avatar in Top-Right Corner */}
        <div className="user-avatar-inside-form">
          <img src={Logo} alt="User" />
        </div>

        <div className="form-header">
          <h1>Verification Form</h1>
        </div>

        <div className="label-field-container">
          <label htmlFor="no-of-items">No of items:</label>
          <div id="no-of-items" className="display-field">
            {submittedItems.length || 0}
          </div>
        </div>

        {submittedItems.length > 0 && (
          <ul>
            {submittedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        <label htmlFor="new-part">New Part no:</label>
        <input
          type="text"
          id="new-part"
          name="newPart"
          value={formData.newPart}
          onChange={handleChange}
          required
        />

        <label htmlFor="old-part">Old Part no:</label>
        <input
          type="text"
          id="old-part"
          name="oldPart"
          value={formData.oldPart}
          onChange={handleChange}
          required
        />

        <label htmlFor="unit-number">Unit number:</label>
        <input
          type="text"
          id="unit-number"
          name="unitNumber"
          value={formData.unitNumber}
          onChange={handleChange}
          required
        />

       
      <label htmlFor="description">Description:</label>
      <div className="grouped-static-fields">
         {/* Static Description Field */}
       <span>- {formData.newPart }</span>
      <br />
      <span>- {formData.oldPart }</span>
      <br />
      <span>- {formData.unitNumber }</span>
      </div>

      <br />

        <div className="form-buttons">
          <button type="button" id="upload-btn">
            Upload Pic
          </button>
          <button type="submit">Submit</button>
        </div>

        <div className="theme-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isDarkTheme}
              onChange={toggleTheme}
            />
            Toggle Dark Theme
          </label>
        </div>
        
      </form>
    </div>
  );
}

export default HomePage;
