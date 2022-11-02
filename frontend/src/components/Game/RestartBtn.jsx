import React from 'react';
import SocketService from '../../services/socket.service';

const RestartBtn = () => {
    return (
        <button className="btn btn-primary btn-lg "
            onClick={() => {
                SocketService.disconnect();
                window.location.reload();
            }}>
            Refresh to start a new game
        </button>
    );
};

export default RestartBtn;
