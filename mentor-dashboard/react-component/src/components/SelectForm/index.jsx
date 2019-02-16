import React from 'react';
import Select from 'react-select';
import './index.css';


export const SelectForm = ({ isDisabled, options, defaultValue, onChange }) => {
  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
          isDisabled={ isDisabled }
          options={ options }
          defaultValue={ defaultValue }
          onChange={ onChange }
        />
      </section>
    </div>
    )
}