import React, { useEffect, useState } from 'react';
import PlayersService from '../../services/players.service';
import PropTypes from 'prop-types';
const defaultPlayers = [];
const defaultDuels = [];

const formatDate = (date) => new Intl.DateTimeFormat('pl-PL', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(date));
const PlayersList = ({ loggedInPlayerId }) => {
    const [players, setPlayers] = useState(defaultPlayers);
    const [duels, setDuels] = useState(defaultDuels);
    const [currentPlayerId, setCurrentPlayerId] = useState(loggedInPlayerId);

    const handlePlayerClick = (id) => {
        setCurrentPlayerId(id);
        PlayersService.getDuels(id).then(duels => {
            setDuels(duels.data.filter(duel => duel.isFinished));
        });
    };
    useEffect(() => {
        PlayersService.getPlayers()
            .then(players => {
                setPlayers(players.data);
                handlePlayerClick(loggedInPlayerId);
            });
    }, [loggedInPlayerId]);

    return (
        <div className="row">
            <div className="col-4">
                <ol className="list-group">
                    {players.map((player) => {
                        const isActive = player.id === currentPlayerId;
                        const isLoggedIn = player.id === loggedInPlayerId;
                        return (
                            <li
                                style={{ cursor: 'pointer' }}
                                className={`list-group-item list-group-item-action ${isActive && 'active'}`}
                                key={player.id}
                                onClick={() => handlePlayerClick(player.id)}
                            >
                                {player.username}
                                {isLoggedIn && <strong> (you)</strong>}
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div className="col-8">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Enemy</th>
                            <th scope="col">Result</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {duels.map((duel, index) => {
                            let classname = 'table-danger';
                            let result = 'lost';
                            if (duel.winnerId === currentPlayerId) {
                                classname = 'table-success';
                                result = 'won';
                            }
                            if (!duel.winnerId) {
                                classname = 'table-warning';
                                result = 'tie';
                            }

                            return (
                                <tr
                                    className={classname}
                                    key={duel.id}
                                >
                                    <th scope="row">{index + 1}</th>
                                    <td>{duel.player2Id === currentPlayerId ? duel.player1.username : duel.player2.username}</td>
                                    <td>{result}</td>
                                    <td>{formatDate(duel.createdAt)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

PlayersList.propTypes = {
    loggedInPlayerId: PropTypes.number,
};

export default PlayersList;
