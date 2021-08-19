const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');

const artistSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: [true, 'Hometown (so you can be paired with local venues)']
  },
  genre: {
    type: String
  },
  joined_date: {
    type: Date,
    default: Date.now
  },
  about: String,
  size: Number,
//venmo: String,
});

//artistSchema.virtual('events', {
//  ref: 'Event', // The model to use
//  localField: '_id', // Find events where `localField`
//  foreignField: 'artist', // is equal to `foreignField`
//  justOne: false // we can have more than 1 event per artist
//});

artistSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('Artist', artistSchema);
