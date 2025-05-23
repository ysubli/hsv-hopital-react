import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>HSV</h2>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><Link to="/">Accueil</Link></li>
        <li className="navbar-item"><Link to="/prise-rdv">Prise de RDV</Link></li>
        <li className="navbar-item"><Link to="/suivi">Suivi de RDV</Link></li>
        <li className="navbar-item"><Link to="/propos">A propos de nous</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
