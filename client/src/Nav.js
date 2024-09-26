import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from './App';
import './Nav1.css';

const Nav = () => {
  const [token, setToken] = useContext(store);  // Access token and setter
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    setToken(null);  // Clear token
    localStorage.removeItem('token');  // Optionally remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className='navbar'>
      <div className='list'>
        <ul>
          {!token ? (
            <>
              <li><Link to='/register'>Register</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </>
          ) : (
            <>
              <li><Link to='/myprofile'>My Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
