import React from 'react';
import { NavLink } from 'react-router-dom';
import NasaLogo from '../images/nasa.jpg';

const Header = () => (
  <header>
    <img src={NasaLogo} alt="The NASA emblem" />
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/favorites">Favorites</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
