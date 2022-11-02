import React from 'react';
import FormInput from 'react-validation/build/input';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


const Input = ({ name, value, onChange, validations }) => (
    <div className="form-group" >
        <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
        <FormInput
            type="text"
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            validations={validations}
        />
    </div>
);

Input.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    validations: PropTypes.arrayOf(PropTypes.func)
};

export default Input;
