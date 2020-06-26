import React from 'react';
import { NavLink } from 'react-router-dom';

import headerStyles from '../styles/header.module.scss';

const Header = () => (
  <header className={headerStyles.header}>
    <ul className={headerStyles.headerLinks}>
      <li>
        <NavLink to="/" className={headerStyles.headerLink}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/favorites" className={headerStyles.headerLink}>
          Favorites
        </NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
