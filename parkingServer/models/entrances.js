const {sequelize} = require('../db');
const Sequelize = require('sequelize');

const Entrance = sequelize.define('entrances', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const sync = () => {
    Entrance.sync({force:true}).then(() =>{
        Entrance.create({
            name: "Front Entrance",
            type: "General"
        }).then(()=>{
            Entrance.create({
                name: "Back Entrance",
                type: "General"
            }).then(()=>{
                Entrance.create({
                    name: "600's Employee Entrance ",
                    type: "Employee"
                }).then(()=>{
                    Entrance.create({
                        name: "Library Employee Entrance",
                        type: "Employee"
                    });
                })
            })
        })
    });
};

module.exports = {
    Entrance,
    sync
};