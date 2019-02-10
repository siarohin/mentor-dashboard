import React from 'react';
import PropTypes from 'prop-types';
import { CONSTANT } from '../../components/constant';

import './index.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  contentCenter: PropTypes.bool
};

const defaultProps = {
  contentCenter: false
};

const Layout = ({ children }) => {
  const  { root } = CONSTANT;
  return (
    <main>
      <h1 className="root__title">{ root }</h1>
      {children}
    </main>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;