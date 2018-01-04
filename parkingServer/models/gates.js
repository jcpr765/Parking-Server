const { sequelize } = require('../db');
const Sequelize = require('sequelize');
const {Location} = require('./locations');

const Gate = sequelize.define('gates', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accessType: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const sync = () => {
    Gate.sync({ force: true }).then(() => {
        Location.findById(1).then((location)=>{
            location.createGate({
                name: "Front Entrance",
                type: "Entrance",
                accessType: "General"
            }).then(() => {
                location.createGate({
                    name: "Back Entrance",
                    type: "Entrance",
                    accessType: "General"
                }).then(() => {
                    location.createGate({
                        name: "600's Employee  Entrance",
                        type: "Entrance",
                        accessType: "Employee"
                    }).then(() => {
                        location.createGate({
                            name: "Library Employee Entrance",
                            type: "Entrance",
                            accessType: "Employee"
                        }).then(() => {
                            location.createGate({
                                name: "Front Exit",
                                type: "Exit",
                                accessType: "General"
                            }).then(() => {
                                location.createGate({
                                    name: "Back Exit",
                                    type: "Exit",
                                    accessType: "General"
                                }).then(() => {
                                    location.createGate({
                                        name: "600's Employee Exit ",
                                        type: "Exit",
                                        accessType: "Employee"
                                    }).then(() => {
                                        location.createGate({
                                            name: "Library Employee Exit",
                                            type: "Exit",
                                            accessType: "Employee"
                                        });
                                    })
                                })
                            })
                        })
                    });
                })
            })  
        })
    })
};

            module.exports = {
                Gate,
                sync
            };