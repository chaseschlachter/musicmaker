const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  venue_id: {
    type: Schema.Types.ObjectId,
    ref: 'Venue',
    index: true
  },
  artist_id: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    index: true
  },
  created: {
    type: Date,  // Captures both date and time
    default: Date.now
  },
  event_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema); 
