import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Square = ({ onClick, value }) => {
    return (
        <button className="square"
            onClick={onClick}>
            {value}
        </button>
    );
};

Square.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
};

export default Square;
