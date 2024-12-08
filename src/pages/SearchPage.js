import React, { useState, useEffect } from 'react';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));
    setStoredData(data);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        {storedData && storedData.name.includes(searchTerm) && (
          <div>
            <p>Name: {storedData.name}</p>
            <p>Email: {storedData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
