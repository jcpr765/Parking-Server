const express = require('express');
const router = express.Router();
const {Location} = require('../models').models;
const Moment = require('moment');
const MomentRange = require('moment-range');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _ = require('lodash');
const moment = MomentRange.extendMoment(Moment);


router.get('/', function(req, res, next) {
    Location.findAll({
        attributes: ['id', 'name']
    }).then((locations)=>{
        res.send(locations);
    });
});

router.get('/week/:locationId', (req, res, next)=>{
    const locationId = parseInt(req.params.locationId);
    const aWeekAgo = moment(new Date()).startOf('day').subtract(6, 'days');
    const today = moment(new Date()).endOf('day');
    const weekStats = [];
    Location.findById(locationId).then((location)=>{
        location.getGates({where: {
            type: "Entrance"
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

module.exports = router;
