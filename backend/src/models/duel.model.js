module.exports = (sequelize, Sequelize) => {
    const Duel = sequelize.define("duels", {
        isFinished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    });

    return Duel;
};
