//schema is array of fan id's
// how to create an object schema of ids

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fanSchema = new Schema({
    fans: [{ type : ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('Fan', eventSchema);
