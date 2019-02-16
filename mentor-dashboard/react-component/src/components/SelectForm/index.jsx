import React from 'react';
import Select from 'react-select';
import './index.css';


export const SelectForm = ({ isDisabled, options, onChange, value }) => {
  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
          isDisabled={ isDisabled }
          options={ options }
          onChange={ onChange }
          value={ value }
        />
      </section>
    </div>
    )
}