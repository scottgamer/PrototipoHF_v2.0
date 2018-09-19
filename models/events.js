const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: String,
    date: String,
    organizedBy: String,
    organizerImg: String,
    description: String,
    img: String,
});

const Event = module.exports = mongoose.model('Event', EventSchema);