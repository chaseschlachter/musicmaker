const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
//  artist_id: {
//    type: Schema.Types.ObjectId,
//    ref: 'Artist'
//    index: true
//  },
  event_name: String,
  location: String,
  description: String,
  image: String,
//  event_start: {
//    type: Date,
//    required: [true, 'Date & time of event start required']
//    },
//  event_end: {
//    type: Date,
//    required: [false, 'Date & time of event end required']
//  },
//  description: String,
//  created: {
//    type: Date,  // Captures both date and time
//    default: Date.now
//  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
});

module.exports = mongoose.model('Event', eventSchema);
