import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import headerStyles from '../styles/header.module.scss';
import setUserStatus from '../redux/actions/user';
import handleLogout from '../redux/actions/logout';
import { auth } from '../firebase/firebase.util';

const Header = ({
  user, history, favorites, setUserStatus, handleLogout,
}) => {
  const logout = async () => {
    await auth.signOut();

    localStorage.removeItem('user');

    localStorage.removeItem('favorites');

    setUserStatus({});

    handleLogout();

    history.push('/signin');
  };

  return (
    <header className={headerStyles.header}>
      <ul className={`${headerStyles.headerLinks} ${user ? 'expandHeader' : ''}`}>
        {
          user && user.email ? (
            <>
              {
              favorites.length > 0 ? (
                <>
                  <li className={headerStyles.headerList}>
                    <NavLink to="/" className={headerStyles.headerLink}>
                      Home
                    </NavLink>
                  </li>
                  <li className={headerStyles.headerList}>
                    <NavLink to="/favorites" className={headerStyles.headerLink}>
                      Favorites
                    </NavLink>
                  </li>
                </>
              ) : null
            }
              <li className={headerStyles.headerList}>
                <div
                  className={headerStyles.headerLink}
                  onClick={logout}
                  onKeyPress={logout}
                  tabIndex={0}
                  role="button"
                >
                  Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <li className={headerStyles.headerList}>
                <NavLink to="/signup" className={headerStyles.headerLink}>
                  Signup
                </NavLink>
              </li>
              <li className={headerStyles.headerList}>
                <NavLink to="/signin" className={headerStyles.headerLink}>
                  Signin
                </NavLink>
              </li>
            </>
          )
        }
      </ul>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
  setUserStatus: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, favorites }) => ({
  user,
  favorites,
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: user => dispatch(setUserStatus(user)),
  handleLogout: () => dispatch(handleLogout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
