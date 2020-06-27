import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store/index';

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        { children }
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
