const express = require('express');
const router = express.Router();

const Events = require('../models/events');

//add new event
router.post('/add', (req, res, next) => {
    let newEvent = new Events({
        name: req.body.name,
        date: req.body.date,
        organizedBy: req.body.organizedBy,
        organizerImg: req.body.organizerImg,
        description: req.body.description,
        img: req.body.img,
    });

    Events.addEvent(newEvent, (err, eve) => {
        if (err) res.json({ success: false, msg: 'Failed to add new event' + err });
        else res.json({ success: true, msg: 'Event added' });
    });

});

//get all events
router.get('/getall', (req, res, next) => {
    Events.getEvents((err, eves) => {
        if (err) throw err;
        res.json(eves);
    });
});

//get event by id
router.get('/getone/:_id', (req, res, next) => {
    let eventId = req.params._id;
    Events.getEventById(eventId, (err, eve) => {
        if (err) throw err;
        res.json(eve);
    });
});

module.exports = router;