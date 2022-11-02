import authHeader from './auth-header';
import http from '../http-common';


const getPlayers = () => {
    return http.get('/players', { headers: authHeader() });
};

const getDuels = (playerId) => {
    return http.get('/duels', { headers: authHeader(), params: { playerId } });
};

const UserService = {
    getPlayers,
    getDuels
};

export default UserService;
