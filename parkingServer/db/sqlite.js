const Sequelize = require('sequelize');

const sequelize = new Sequelize('parking_db', null, null, {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: './parking_db.sqlite'
});

module.exports = sequelize;