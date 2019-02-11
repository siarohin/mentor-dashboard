import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  contentCenter: PropTypes.bool
};

const defaultProps = {
  contentCenter: false
};

const Title = ({ contentTitle }) => {
  return (
    <h1 className='root__title'>{ contentTitle }</h1>
  )
};

const Layout = ({ contentTitle, children, contentCenter }) => {
  return (
    <section>
      <Title contentTitle={ contentTitle } />
      <main className={contentCenter ? 'content-center' : ''}>
        {children}
      </main>
    </section>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;