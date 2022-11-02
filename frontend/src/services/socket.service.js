import AuthService from './auth.service';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
let socket;

const connect = () => {
    if (!socket) {
        socket = io.connect(SOCKET_URL,
            {
                // path: '/socket.io',
                transports: ['websocket', 'polling'],
                query: `player=${AuthService.getCurrentUser()?.id}`,
            });
    }
    return socket;
};
const disconnect = () => {
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
