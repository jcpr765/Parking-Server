const {sequelize} = require('../db');
const Sequelize = require('sequelize');

const Location = sequelize.define('locations', {
    name: {
        type: Sequelize.STRING
    }
});

const sync = () => {
    Location.sync({force:true}).then(()=>{
        Location.create({
            name: 'UPR Bayamon'
        });
    });
};

module.exports = {
    Location,
    sync
};