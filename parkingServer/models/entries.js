const {sequelize} = require('../db');
const Sequelize = require('sequelize');
const faker = require('faker');
const moment = require('moment');
const {Gate} = require('./gates');
const _ = require('lodash');

//Defines the table entries
const Entry = sequelize.define('entries', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Synchronizes the table (i.e. Creates the table and its first rows)
const sync = () => {
    Entry.sync({force:true}).then(()=>{
        Gate.findAll().then((gates)=>{
            gates.forEach((g)=>{
                const entries = [];
                let totalDays = 7;
                let max;
                if(g.type === "Entrance")
                    max = 120;
                else
                    max = 50;
                for(var i = 1; i <= totalDays; i++) {
                    entries.push(
                        g.createEntry({
                            quantity: faker.random.number(max),
                            createdAt: moment(new Date()).subtract(totalDays - i, 'days').endOf('day').format()
                        })
                    );
                }

                return entries;
            });
        });
    });
};

// const sync = () => {
//     Entry.sync({force: true}).then(()=>{
//         Gate.findAll().then((gates)=>{
//             gates.forEach((g)=>{
//                 let i = 6;
//                 const entries = [];
//                 _.times(6, ()=>{
//                     entries.push(
//                         g.createEntry({
//                             quantity: faker.random.number(100),
//                             createdAt: moment().subtract(i--, 'days').startOf('day').format('YYYY-MM-DD HH:MM:SS.SSS')
//                         })
//                     )
//                 })
//                 return entries;
//             })
//         })
//     });
// }

//Exports the table definition and it's sync function
module.exports = {
    Entry,
    sync
};