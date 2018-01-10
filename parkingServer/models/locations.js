const {sequelize} = require('../db');
const Sequelize = require('sequelize');

const Location = sequelize.define('locations', {
    name: {
        type: Sequelize.STRING
    },

    capacity: {
        type: Sequelize.INTEGER
    }
});

const sync = () => {
    Location.sync({force:true}).then(()=>{
        Location.create({
            name: 'UPR Bayamon',
            capacity: 500
        });
    });
};

module.exports = {
    Location,
    sync
};