const db = require("../models");
const Player = db.player;

checkDuplicateUsername = (req, res, next) => {
    Player.findOne({
        where: {
            username: req.body.username
        }
    }).then(player => {
        if (player) {
            res.status(400).send({
                message: "Username is already in use!"
            });
            return;
        }
        next();
    });
};

checkDuplicateEmail = (req, res, next) => {
    Player.findOne({
        where: {
            email: req.body.email
        }
    }).then(player => {
        if (player) {
            res.status(400).send({
                message: "Email is already in use!"
            });
            return;
        }

        next();
    });
};
const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateEmail,
};

module.exports = verifySignUp;
