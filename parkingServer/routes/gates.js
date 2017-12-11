const express = require('express');
const router = express.Router();
const {Gate} = require('../models').models;

router.post('/gate/:gateId/amount/:amt', (req, res, next) => {
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

router.get('')

module.exports = router;