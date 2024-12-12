import './NavBar.css';




// function NavBar() {
//     return (
//       <div className='navbar'>
//             <a href="/" className="active" >Home</a>
          
//             <a href="/search" className="acti" >Search</a>
        

//       </div>
//     );
//   }

//   export default NavBar;

import './NavBar.css';
import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

function NavBar() {

  const location = useLocation();

  return (
    <div className="navbar">
    
       
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Search</Link>
        

    </div>
  );
}

export default NavBar;