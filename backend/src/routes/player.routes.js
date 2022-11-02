const { authJwt } = require("../middleware");
const controller = require("../controllers/player.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/players",
        [authJwt.verifyToken],
        controller.players
    );
    app.get(
        "/api/duels",
        [authJwt.verifyToken],
        controller.duels
    );
    app.post(
        "/api/duels/new",
        [authJwt.verifyToken],
        controller.startDuel
    );
};
