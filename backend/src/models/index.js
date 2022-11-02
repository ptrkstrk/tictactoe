const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: { ...config.pool }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Player = require("./player.model.js")(sequelize, Sequelize);
const Duel = require("../models/duel.model.js")(sequelize, Sequelize);

Player.hasMany(Duel, {
    foreignKey: "player1Id",
    as: 'duelsPlayedAsFirst'
});

Duel.belongsTo(Player, {
    otherKey: "player1Id",
    as: 'player1'
});

Player.hasMany(Duel, {
    foreignKey: "player2Id",
    as: 'duelsPlayedAsSecond',
});

Duel.belongsTo(Player, {
    otherKey: "player2Id",
    as: 'player2',
});

Player.hasMany(Duel, {
    as: 'wonDuels',
    foreignKey: 'winnerId'
});
Duel.belongsTo(Player, {
    as: 'winner',
    otherKey: 'winnerId'
});

db.player = Player;
db.duel = Duel;

module.exports = db;
