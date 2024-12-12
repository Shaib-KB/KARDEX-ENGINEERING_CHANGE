

import './NavBar.css';
import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import Logo from '../pages/Logo.jpg';


function NavBar() {

  const location = useLocation();

  return (
    <div className="navbar">
    
       
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Search</Link>

         {/* User Avatar in the form */}
        <div className="user-avatar-inside-form">
          <img src={Logo} alt="User Avatar" />
        </div>

    </div>
  );
}

export default NavBar;