import React from 'react';
import { Link } from 'react-router-dom';
import './Nav1.css';

const Nav = () => {
  return (
    <div className='navbar'>
      <div className='list'>
        <ul>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
