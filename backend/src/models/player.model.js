module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Player;
};
