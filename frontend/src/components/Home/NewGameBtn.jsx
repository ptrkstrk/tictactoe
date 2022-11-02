import React from 'react';
import { Link } from 'react-router-dom';

const NewGameBtn = () => {
    return (
        <Link to="/duel">
            <button
                className="btn btn-primary btn-lg "
            >
                Start new game!
            </button>
        </Link >
    );
};

export default NewGameBtn;
