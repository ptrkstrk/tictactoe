const db = require("../models");
const config = require("../config/auth.config");
const Player = db.player;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    Player.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(() => {
            res.send({ message: "Player was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    Player.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(player => {
            if (!player) {
                return res.status(404).send({ message: "Player not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                player.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: player.id }, config.secret, {
                expiresIn: 24 * 60 * 60,
            });

            res.status(200).send({
                id: player.id,
                username: player.username,
                email: player.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
