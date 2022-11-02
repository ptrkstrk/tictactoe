import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';


const getPlayers = () => {
    return axios.get(API_URL + 'players', { headers: authHeader() });
};

const getDuels = (playerId) => {
    return axios.get(API_URL + 'duels', { headers: authHeader(), params: { playerId } });
};

const UserService = {
    getPlayers,
    getDuels
};

export default UserService;
