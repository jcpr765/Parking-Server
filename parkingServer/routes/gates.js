const express = require('express');
const router = express.Router();
const {Location, Gate, Entry} = require('../models').models;
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/:gateId/:amt', (req, res, next) => {
    const gateId = parseInt(req.params.gateId);
    const amt = parseInt(req.params.amt);
    Gate.findById(gateId).then((gate) => {
        gate.createEntry({
            quantity: amt
        });
    }).then(()=>{
        res.sendStatus(200);
    });
});

router.get('/week/:locationId', (req, res, next)=>{
    const locationId = parseInt(req.params.locationId);
    const aWeekAgo = moment(new Date()).startOf('day').subtract(6, 'days');
    const today = moment(new Date()).endOf('day');
    const names = [];
    const result = [];
    Location.findById(locationId).then((location)=>{
        location.getGates({where:
        {accessType: 'General'}}).then((gates)=>{
            const promises = gates.map((g) => {
                names.push(g.name);
                return Entry.sum('quantity', { where: {
                    createdAt: {
                        [Op.gte]: aWeekAgo,
                        [Op.lte]: today
                    },
                    gateId: g.id,
                }});
            });

            Promise.all(promises).then((sums) =>{
                let i = sums.length;
                for(i=0; i < sums.length; i++){
                    const obj = {
                        name: names[i],
                        total: sums[i],
                    }
                    result.push(obj);
                }
                res.send(result);
            });
        })
    });
});
module.exports = router;