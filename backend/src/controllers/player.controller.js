const db = require("../models");
const { Op } = require("sequelize");

const Player = db.player;
const Duel = db.duel;

exports.players = (req, res) => {
    Player.findAll({
        order: [['username', 'ASC']],
        attributes: ['username', 'id']
    })
        .then(players =>
            res.status(200).send(
                players,
            ));
};

exports.duels = (req, res) => {
    Duel.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            [Op.or]: [
                { player1Id: req.query.playerId },
                { player2Id: req.query.playerId },
            ]
        },
        include: [{
            model: Player,
            attributes: ['username'],
            as: 'player1',
        }, {
            model: Player,
            attributes: ['username'],
            as: 'player2',
        }],

    }).then(duels =>
        res.status(200).send(
            duels,
        ));
}

exports.startDuel = (req, res) => {
    Duel.findOne({
        order: sequelize.random(),
        attributes: ['id'],
        where: {
            id: { [Op.ne]: req.body.player1Id }
        }
    })
        .then(player2Id => {

            Duel.create({
                player1Id: req.body.player1Id,
                player2Id: player2Id,
            })
        })
        .then(() => {
            res.send({ message: "Duel was created" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });;
}

exports.finishDuel = (req, res) => {
    Duel.findAll({
        where: {
            [Op.or]: [
                { player1Id: req.query.playerId },
                { player2Id: req.query.playerId },
            ]
        },
    })
}
