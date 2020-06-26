import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
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
