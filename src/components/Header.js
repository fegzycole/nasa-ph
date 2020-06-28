import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import headerStyles from '../styles/header.module.scss';

import setUserStatus from '../redux/actions/user';
import { auth } from '../firebase/firebase.util';

const Header = ({
  user, history, favorites, setUserStatus,
}) => {
  const logout = async () => {
    await auth.signOut();

    localStorage.removeItem('user');

    setUserStatus({});

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
};

const mapStateToProps = ({ user, favorites }) => ({
  user,
  favorites,
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: user => dispatch(setUserStatus(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
