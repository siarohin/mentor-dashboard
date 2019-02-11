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

const Layout = ({ children, contentCenter }) => {
  const  { root } = CONSTANT;
  return (
    <section>
      <h1 className="root__title">{ root }</h1>
      <main className={contentCenter ? 'content-center' : ''}>
        {children}
      </main>
    </section>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;