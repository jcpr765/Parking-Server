const { sequelize } = require('../db');
const Sequelize = require('sequelize');

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
        Gate.create({
            name: "Front Entrance",
            type: "Entrance",
            accessType: "General"
        }).then(() => {
            Gate.create({
                name: "Back Entrance",
                type: "Entrance",
                accessType: "General"
            }).then(() => {
                Gate.create({
                    name: "600's Employee  Entrance",
                    type: "Entrance",
                    accessType: "Employee"
                }).then(() => {
                    Gate.create({
                        name: "Library Employee Entrance",
                        type: "Entrance",
                        accessType: "Employee"
                    }).then(() => {
                        Gate.create({
                            name: "Front Exit",
                            type: "Exit",
                            accessType: "General"
                        }).then(() => {
                            Gate.create({
                                name: "Back Exit",
                                type: "Exit",
                                accessType: "General"
                            }).then(() => {
                                Gate.create({
                                    name: "600's Employee Exit ",
                                    type: "Exit",
                                    accessType: "Employee"
                                }).then(() => {
                                    Gate.create({
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
};

            module.exports = {
                Gate,
                sync
            };