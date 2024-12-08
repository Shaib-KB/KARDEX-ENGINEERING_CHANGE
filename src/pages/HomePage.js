import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';


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

  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to manage theme
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
    navigate('/search');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`form-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <form id="ec-verification-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Verification Form</h1>
          <div className="logo img">
            <img
              src="/home/kwanele/spiced-bootcamp/kardex-engineering_change/public/Logo.jpg"
              alt="MBSA Logo"
            />
          </div>
        </div>

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

        <label htmlFor="line">Line:</label>
        <input
          type="text"
          id="line"
          name="line"
          value={formData.line}
          onChange={handleChange}
          required
        />

        <label htmlFor="stn">STN:</label>
        <input
          type="text"
          id="stn"
          name="stn"
          value={formData.stn}
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
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="picture">New Picture: (Optional)</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="form-buttons">
          <button type="button" id="upload-btn">
            Upload Pic
          </button>
          <button type="submit">Submit</button>
        </div>

        {/* Toggle Theme Button */}
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
