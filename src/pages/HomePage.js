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
  const [imageUrl, setImageUrl] = useState(null);
  const [filter, setFilter] = useState('none');
  const [widgets, setWidgets] = useState([]);

  const navigate = useNavigate();

  // Form Handlers
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
    setFormData({
      newPart: '',
      oldPart: '',
      line: '',
      stn: '',
      unitNumber: '',
      description: '',
      picture: null,
    });
    navigate('/search');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Drag-and-Drop Handlers
  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData('widgetType', widgetType);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData('widgetType');
    setWidgets((prevWidgets) => [...prevWidgets, widgetType]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`form-container ${isDarkTheme ? 'dark-theme' : ''}`}>
       
      <form id="ec-verification-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Engineering Change Verification Form</h1>
        </div>

        <div className="user-avatar-inside-form">
          <img src={Logo} alt="User Avatar" />
        </div>

        <div className="label-field-container">
          <label htmlFor="no-of-items">No of items:</label>
          <div id="no-of-items" className="display-field">
            {submittedItems.length}
          </div>
        </div>

        {submittedItems.length > 0 && (
          <ul>
            {submittedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        <label htmlFor="new-part">New Part no & Unit no:</label>
        <input
          type="text"
          id="new-part"
          name="newPart"
          value={formData.newPart}
          onChange={handleChange}
          required
        />

               {/* <label htmlFor="unit-number">Unit number:</label>
        <input
          type="text"
          id="unit-number"
          name="unitNumber"
          value={formData.unitNumber}
          onChange={handleChange}
          required
        /> */}

        <label htmlFor="description">Description:</label>
        <div className="grouped-static-fields">
          <span>- {formData.newPart}</span>
          <br />
         
          {/* <span>- {formData.unitNumber}</span> */}
        </div>

        {/* Drag-and-Drop Section */}
        <div className="widgets">
          <label>Car Model</label>
          <div className='widget-name'>
          <div
            className="widget"
            draggable
            onDragStart={(e) => handleOnDrag(e, 'AMG C63')}
        
          >
            AMG C63
          </div>
          <div
            className="widget"
            draggable
            onDragStart={(e) => handleOnDrag(e, 'AMG C43')}
          >
            AMG C43
          </div>
          
          </div>
          <div className='pageWidget'>

          
          <div
            className="page"
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{
              border: '2px dashed gray',
              minHeight: '5px',
              padding: '10px',
            }}
          >
            {widgets.length === 0 ? (
              <p>Drag and drop a car model here!</p>
            ) : (
              widgets.map((widget, index) => (
                <div className="dropped-widget" key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '10px' }}>{widget}</span>
                  <button
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => {
                      setWidgets((prevWidgets) => prevWidgets.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          </div>
        </div>

        <div className="picture-upload">
          <label htmlFor="picture">Picture of Product:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
          />
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

        <div className="form-buttons">
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
