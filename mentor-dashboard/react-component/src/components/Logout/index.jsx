import React from 'react';

import './index.css';


const Logout = ({ photoURL, onClick }) => {
  return (
    <div className='logout-container'>
      <button className='logout-navigation__button clear-button' onClick={ onClick }>
        <img className='button__img' alt='' src={ photoURL } />
        <span className='button__text'>Logout</span>
      </button>
    </div>
  );
}

export default Logout;