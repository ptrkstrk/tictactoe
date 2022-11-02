import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square';
import './styles.scss';

const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };


    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

Board.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
};

export default Board;
