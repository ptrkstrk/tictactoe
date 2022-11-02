import React from 'react';
import Board from '../Board/Board';
import './styles.scss';
import RestartBtn from './RestartBtn';
import SocketService from '../../services/socket.service';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isPlayerTurn: true,
            symbol: null,
            winner: null,
        };
    }

    componentDidMount() {
        const socket = SocketService.connect();
        socket.on('game.begin', ({ symbol }) => {
            this.setState({
                symbol,
                isPlayerTurn: symbol === 'X'
            });
        });

        socket.on('move.made', ({ position, symbol }) => {
            const squares = this.state.squares.slice();
            if (calculateWinner(squares) || squares[position]) {
                return;
            }
            squares[position] = symbol;
            const winner = calculateWinner(squares);
            if (winner === this.state.symbol) {
                socket.emit('game.won');
            }
            if (winner === 'tie' && this.state.symbol === 'X') {
                socket.emit('game.tie');
            }
            this.setState({
                squares,
                isPlayerTurn: !this.state.isPlayerTurn,
                winner
            });
        });

        socket.on('opponent.left', () => {
            this.setState({ opponentLeft: true });
        });
        this.setState({ socket });
    }


    handleClick(i) {
        const { isPlayerTurn, winner, symbol, squares } = this.state;
        if (!isPlayerTurn
            || winner
            || squares[i]) {
            return;
        }
        this.state.socket.emit('make.move', {
            symbol,
            position: i,
        });
    }

    render() {
        const { winner,
            isPlayerTurn,
            symbol,
            opponentLeft
        } = this.state;
        let status;

        if (opponentLeft) {
            return (
                <div className="wrapper">
                    <h2>Opponent left the game. It will be counted as your victory.</h2>
                    <RestartBtn />
                </div>
            );
        }
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if (isPlayerTurn) {
                status = `Next player: ${symbol}`;
            }
            else {
                if (symbol === 'X')
                    status = 'Next player: O';
                else
                    status = 'Next player: X';
            }
        }

        return (
            <div className="wrapper">
                {symbol
                    ? (
                        <>
                            <h2>{`You play as ${this.state.symbol} `}</h2>
                            {winner
                                ? <>
                                    <div className="game-info winner">
                                        {status}
                                    </div>
                                    <RestartBtn />
                                </>

                                : <div className="game-info">
                                    {status}
                                </div>}
                            <div className="game-board">
                                <Board
                                    squares={this.state.squares}
                                    onClick={(i) => this.handleClick(i)} />
                            </div>
                        </>
                    )
                    : (<h2>Waiting for opponent</h2>)
                }
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (squares.every(square => square)) {
        return 'tie';
    }
    return null;
}
