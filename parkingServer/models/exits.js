const {sequelize} = require('../db');
const Sequelize = require('sequelize');

const Exit = sequelize.define('exits', {
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
    Exit.sync({force:true}).then(() =>{
        Exit.create({
            name: "Front Exit",
            type: "General"
        }).then(()=>{
            Exit.create({
                name: "Back Exit",
                type: "General"
            }).then(()=>{
                Exit.create({
                    name: "600's Employee Exit ",
                    type: "Employee"
                }).then(()=>{
                    Exit.create({
                        name: "Library Employee Exit",
                        type: "Employee"
                    });
                })
            })
        })
    });
};

module.exports = {
    Exit,
    sync
};