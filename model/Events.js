const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    groupName: String,
    day: String,
    room: String,
    formateur: String,
    startTime: String,
    endTime: String,
  });
  
  const EventModel = mongoose.model('Event', eventSchema);
  module.exports = EventModel