const {sequelize} = require('../db');
const Sequelize = require('sequelize');

const Entry = sequelize.define('entries', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const sync = () => {
    Entry.sync({force:true});
};


module.exports = {
    Entry,
    sync
};