const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./src/models');
var bcrypt = require('bcryptjs');
require("dotenv").config();


const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./src/routes/auth.routes')(app);
require('./src/routes/player.routes')(app);

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: corsOptions });
const PORT = process.env.NODE_DOCKER_PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const Player = db.player;
const Duel = db.duel;

const initialize = () => {
    Player.create({
        username: 'user',
        password: bcrypt.hashSync('password', 8),
    })

    Player.create({
        username: 'enemy',
        password: bcrypt.hashSync('password', 8),
    })

    Duel.create({
        player1Id: 1,
        player2Id: 2,
        isFinished: true,
    })
}
// db.sequelize.sync({ force: true }).then(() => {
//     initialize();
// });

db.sequelize.sync();


// sockets stuff
const players = {};
let awaitingPlayerId;

const joinGame = socket => {
    const playerId = socket.handshake.query.player;
    const playerAlreadyWaiting = awaitingPlayerId && players[awaitingPlayerId].playerId === playerId;
    if (playerAlreadyWaiting) {
        delete players[awaitingPlayerId];
        awaitingPlayerId = null;
    }

    players[socket.id] = {
        playerId: playerId,
        opponent: awaitingPlayerId,
        symbol: 'X',
        socket: socket
    };

    if (awaitingPlayerId) {
        players[socket.id].symbol = 'O';
        players[awaitingPlayerId].opponent = socket.id;
        awaitingPlayerId = null;
    } else {
        awaitingPlayerId = socket.id;
    }
}

const handleWin = socket => {
    const duel = players[socket.id].duel;
    duel.isFinished = true;
    duel.winnerId = players[socket.id].playerId;
    duel.save();
}

const handleTie = socket => {
    const duel = players[socket.id].duel;
    duel.isFinished = true;
    duel.save();
}

const getOpponent = (socket) => {
    if (!players[socket.id]?.opponent) {
        return;
    }

    return players[players[socket.id].opponent];
}

io.on('connection', async (socket) => {
    console.log('connection')
    joinGame(socket);
    const opponent = getOpponent(socket);

    if (opponent) {
        const duel = await Duel.create({
            player1Id: players[socket.id].playerId,
            player2Id: opponent.playerId,
            isFinished: false,
        })
        players[socket.id].duel = duel;
        opponent.duel = duel;
        socket.emit('game.begin', {
            symbol: players[socket.id].symbol
        });

        opponent.socket.emit('game.begin', {
            symbol: opponent.symbol
        });
    }

    socket.on('make.move', data => {
        const opponent = getOpponent(socket);
        if (!opponent) {
            return;
        }

        socket.emit('move.made', data);
        opponent.socket.emit('move.made', data);
    });

    socket.on('game.won', () => {
        handleWin(socket);
    });
    socket.on('game.tie', () => {
        handleTie(socket);
    });

    socket.on('disconnect', () => {
        console.log('DISCONNECT')
        const opponent = getOpponent(socket);
        if (opponent && !players[socket.id].duel.isFinished) {
            handleWin(opponent.socket);
            opponent.socket.emit('opponent.left');
        }
    });
});
