import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Spinner from '../components/Spinner';
import toggleSpinner from '../redux/actions/spinner';
import { auth } from '../firebase/firebase.util';

const Signup = ({ spinner, toggleSpinner, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const signup = async e => {
    e.preventDefault();

    setError(null);

    if (password !== passwordConfirmation) {
      setError('Passwords must match!!');
    } else {
      try {
        toggleSpinner();
        await auth.createUserWithEmailAndPassword(email, password);
        toggleSpinner();

        history.push('/');
      } catch (error) {
        toggleSpinner();
        setError(error.message);
      }
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
        headerText="Sign Up"
        showExtraPassword
        confirmPassword={passwordConfirmation}
        handlePasswordConfirmationChange={e => setPasswordConfirmation(e.target.value)}
        handleSubmit={signup}
        submitBtnText="Register"
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
});

Signup.propTypes = {
  spinner: PropTypes.bool.isRequired,
  toggleSpinner: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
