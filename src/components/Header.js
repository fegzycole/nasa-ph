import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import headerStyles from '../styles/header.module.scss';

import setUserStatus from '../redux/actions/user';
import { auth } from '../firebase/firebase.util';

const Header = ({
  user, setUserStatus, history, favorites,
}) => {
  const logout = async () => {
    await auth.signOut();

    history.push('/signin');
  };

  auth.onAuthStateChanged(loggedInUser => {
    setUserStatus(loggedInUser);
  });

  return (
    <header className={headerStyles.header}>
      <ul className={`${headerStyles.headerLinks} ${user ? 'expandHeader' : ''}`}>
        {
          user ? (
            <>
              {
              favorites.length > 0 ? (
                <>
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
                </>
              ) : null
            }
              <li>
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
              <li>
                <NavLink to="/signup" className={headerStyles.headerLink}>
                  Signup
                </NavLink>
              </li>
              <li>
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
  user: PropTypes.instanceOf(Object),
  setUserStatus: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
};

Header.defaultProps = {
  user: null,
};

const mapStateToProps = ({ user, favorites }) => ({
  user,
  favorites,
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: payload => dispatch(setUserStatus(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
