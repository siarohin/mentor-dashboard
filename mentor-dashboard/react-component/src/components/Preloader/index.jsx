import React from 'react';
import Layout from '../../containers/Layout/';
import './index.css';


export const Preloader = () => {
  return (
    <Layout contentTitle={'Please, wait'} contentCenter={true}>
      <div className="lds-dual-ring"></div>
    </Layout>
  )
};