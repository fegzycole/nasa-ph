import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Spinner from '../components/Spinner';
import toggleSpinner from '../redux/actions/spinner';
import setUserStatus from '../redux/actions/user';
import { auth } from '../firebase/firebase.util';

const SignIn = ({
  spinner, toggleSpinner, history, setUserStatus,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signin = async e => {
    e.preventDefault();

    setError(null);
    try {
      toggleSpinner();

      const { user } = await auth.signInWithEmailAndPassword(email, password);

      const newUser = JSON.stringify(user);

      localStorage.setItem('user', newUser);

      setUserStatus(user);

      toggleSpinner();

      return history.push('/');
    } catch (error) {
      toggleSpinner();
      setError(error.message);
    }
  };

  return (
    <div>
      {
        spinner && <Spinner addOverlay />
      }
      <Form
        email={email}
        password={password}
        handleEmailChange={e => setEmail(e.target.value)}
        handlePasswordChange={e => setPassword(e.target.value)}
        headerText="Sign In"
        handleSubmit={signin}
        submitBtnText="Login"
        error={error}
      />
    </div>
  );
};

const mapStateToProps = ({ spinner }) => ({
  spinner,
});

const mapDispatchToProps = dispatch => ({
  toggleSpinner: () => dispatch(toggleSpinner()),
  setUserStatus: user => dispatch(setUserStatus(user)),
});

SignIn.propTypes = {
  spinner: PropTypes.bool.isRequired,
  toggleSpinner: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  setUserStatus: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
