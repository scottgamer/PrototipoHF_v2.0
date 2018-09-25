const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: String,
    date: String,
    organizedBy: String,
    organizerImg: String,
    description: String,
    img: String,
});

const Events = module.exports = mongoose.model('Event', EventSchema);

//functions

module.exports.addEvent = (newEvent, callback) => {
    newEvent.save(callback);
};

module.exports.getEventById = (id, callback) => {
    Events.findById(id, callback);
};

module.exports.getEvents = (callback, limit) => {
    Events.find(callback).limit(limit);
};