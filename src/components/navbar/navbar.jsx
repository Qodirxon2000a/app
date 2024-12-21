// components/navbar/navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navLinks">
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="/admin" className="link">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
