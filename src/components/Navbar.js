import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>HSV</h2>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="#accueil">Accueil</a></li>
        <li className="navbar-item"><a href="#prise">Prise de RDV</a></li>
        <li className="navbar-item"><a href="#suivi">Suivi de RDV</a></li>
        <li className="navbar-item"><a href="#propos">A propos de nous</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
