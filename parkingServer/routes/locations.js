const express = require('express');
const router = express.Router();
const {Location, Entry} = require('../models').models;
const Moment = require('moment');
const MomentRange = require('moment-range');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _ = require('lodash');
const moment = MomentRange.extendMoment(Moment);


router.get('/', function(req, res, next) {
    Location.findAll({
        attributes: ['id', 'name', 'capacity']
    }).then((locations)=>{
        res.send(locations);
    });
});

router.get('/:locationId', (req, res, next) =>{
    const locationId = parseInt(req.params.locationId);
    Location.findById(locationId).then((location)=>{
        res.send(location);
    });
});

router.get('/today/:locationId', (req, res, next)=>{
    const locationId = parseInt(req.params.locationId);
    const today = moment(new Date()).startOf('day');
    Location.findById(locationId).then((location)=>{
        location.getGates({where: {
            type: "Entrance",
            accessType: "General"
        },
        attributes: ['id']
        }).then((entrances)=>{
            const entranceIdList = entrances.map((obj)=>{
                return obj.id;
            });
            Entry.sum('quantity', {where: {
                createdAt: {[Op.gte]: today},
                gateId: {[Op.or]: entranceIdList}
            }}).then((entrancesSum)=>{
                location.getGates({where:{
                    type: "Exit",
                    accessType: "General"
                },
                attributes: ['id']
                }).then((exits)=>{
                    const exitIdList = exits.map((obj)=>{
                        return obj.id;
                    });
                    Entry.sum('quantity', {where: {
                        createdAt: {[Op.gte]: today},
                        gateId: {[Op.or]: exitIdList}
                    }}).then((exitsSum)=>{
                        const total = entrancesSum-exitsSum;
                        res.send(
                            [
                                {
                                    name: 'Taken spots',
                                    value: total
                                },
                                {
                                    name: 'Available spots',
                                    value: location.capacity - total
                                }
                            ]
                        );
                    });
                });
            });
        });
    });
});

router.get('/week/:locationId', (req, res, next)=>{
    const locationId = parseInt(req.params.locationId);
    const aWeekAgo = moment(new Date()).startOf('day').subtract(6, 'days');
    const today = moment(new Date()).endOf('day');
    const weekStats = [];
    Location.findById(locationId).then((location)=>{
        location.getGates({where: {
            type: "Entrance",
            accessType: "General"
        }}).then((gates) => {
            const promises = gates.map((g) => {
                return g.getEntries({ where: {
                    createdAt: {
                        [Op.gte]: aWeekAgo,
                        [Op.lte]: today
                    }
                }});
            });
            
            Promise.all(promises).then((entries) => {
                const range = moment.range(aWeekAgo, today);
                for(const selectedDate of range.by('day')) {
                    let entriesCount = 0;
                    entries.forEach((ent) => {
                        ent.forEach((e) => {
                            if (moment(moment(e.createdAt).format('YYYY-MM-DD')).isBetween(selectedDate.startOf('day').format('YYYY-MM-DD'), selectedDate.endOf('day').format('YYYY-MM-DD'), null, '[]')) {
                                entriesCount += e.quantity;
                            }
                        });
                    });

                    weekStats.push({
                        name: moment(selectedDate).format('dddd'),
                        fullDate: moment(selectedDate).format(),
                        total: entriesCount,
                    });
                }

                res.send(weekStats);
            });
        });
    });
});

// router.get('/today/:locationId', (req, res, next) =>{
//     const locationId = parseInt(req.params.locationId);
//     const today = moment(new Date()).startOf('day');
//     const todayStats = [];
//     const entrancesTotal = [];
//     const exitsTotal = [];
//     Location.findById(locationId).then((location)=>{
//         location.getGates({
//             where: {
//                 type: "Entrance"
//             }
//         }).then((entrances)=>{
//             const promises = entrances.map((e)=>{
//                 return e.getEntries({where: {
//                     createdAt: {
//                         [Op.gte]: today
//                     }
//                 }});
//             })

//             Promise.all(promises).then((entries))
//         });
//     });
// });

router.post(':locationId/:gateId/', (req, res, next) => {
    const locationId = parseInt(req.params.locationId);
    const gateId = parseInt(req.params.gateId);
    Location.findById(locationId).then((location)=>{
        location.getGates({where:{
            id: gateId
        }}).then((gate)=>{
            gate.createEntry({
                quantity: 1
            });
        });
    });
});

module.exports = router;
