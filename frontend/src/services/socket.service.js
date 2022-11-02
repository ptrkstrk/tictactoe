import AuthService from './auth.service';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8080';
let socket;

const connect = () => {
    console.log('connect');
    if (!socket) {
        socket = io.connect(SOCKET_URL,
            {
                query: `player=${AuthService.getCurrentUser()?.id}`
            });
    }
    return socket;
};
const disconnect = () => {
    console.log('disconnect');
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

const SocketService = {
    connect,
    disconnect
};

export default SocketService;
