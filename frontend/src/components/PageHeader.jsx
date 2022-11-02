import React from 'react';
import PropTypes from 'prop-types';
const PageHeader = ({ user, children }) => {
    return (
        <div className="container">
            <header className="jumbotron">
                <h2 style={{ textAlign: 'center' }}>
                    <strong style={{ display: 'block', textAlign: 'center' }}>Welcome to TicTacToe app!</strong>
                </h2>
                <h4 style={{ textAlign: 'center' }} >
                    {user && <span>Logged in as <strong>{user.username}</strong></span>}
                </h4>
                {children}
            </header>
        </div >
    );
};
PageHeader.propTypes = {
    user: PropTypes.shape({ username: PropTypes.string }),
    children: PropTypes.node,
};

export default PageHeader;
