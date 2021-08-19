const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      year_born: {
          type: Number,
          required: [true, 'Certain events are 21+']
      },
      phone: {
          type: Number,
          required: [true, "Needed as we'll text you your check-in validation at events (and nothing more)"]
      }
//    gender: {
//       type: String,
//        required: true
//    },
//    first_name: {
//        type: String,
//    },
//    last_name: {
//        type: String,
//    },
});
UserSchema.plugin(passportlocalMongoose);

module.exports = mongoose.model('User', UserSchema);
