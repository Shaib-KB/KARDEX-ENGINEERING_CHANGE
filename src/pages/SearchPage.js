import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import Logo from '../pages/Logo.jpg'; // Default logo or avatar

function SearchPage() {
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
  const [imageUrl, setImageUrl] = useState(null);
  const [filter, setFilter] = useState('none');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: file,
      }));
      setImageUrl(URL.createObjectURL(file));
    }
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
        <div className="form-header">
          <h1>Verification Form</h1>
        </div>

        {/* User Avatar in the form */}
        <div className="user-avatar-inside-form">
          <img src={Logo} alt="User Avatar" />
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
        <div id="new-part-no" className="display-field">
           
        </div>

        <label htmlFor="old-part">Old Part no:</label>
        <div id="Old-Part-no" className="display-field">
           
        </div>

        <label htmlFor="unit-number">Unit number:</label>
        <div id="unit-number" className="display-field">
           
        </div>

        <label htmlFor="description">Description:</label>
        <div id="description" className="display-field">
           
        </div>

        {/* Picture Upload Section */}
        <div className="picture-upload">
          <label htmlFor="picture">Picture of Product:</label>
          <div id="picture" className="display-field">
           
           </div>
           <br></br>
          {imageUrl && (
            <div className="image-preview">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="resizable-image"
                style={{
                  filter: filter,
                  maxWidth: '100%',
                  maxHeight: '300px',
                  resize: 'both',
                  overflow: 'auto',
                }}
                draggable="true"
              />
              <div className="filter-controls">
                <label>Apply Filter:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="grayscale(100%)">Grayscale</option>
                  <option value="sepia(80%)">Sepia</option>
                  <option value="brightness(120%)">Brightness</option>
                  <option value="contrast(150%)">Contrast</option>
                </select>
              </div>
            </div>
          )}
        </div>
           
       
        <div>
          
          <input
          type="text"
          id="search-unit-no"
          name="searchUnitNo"
          value={formData.searchPartNo}
          onChange={handleChange}
          required
           placeholder='search unit number'
  
        />
        </div>

        <div className="form-buttons">
          <button type="Search">Search</button>
        </div>
        <br></br> 

        <div className="form-buttons">
          <button type="Search">Confirm</button>
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

export default SearchPage;
