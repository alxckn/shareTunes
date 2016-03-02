var mongoose = require('mongoose');

// define the schema for our user model
var friendshipSchema = mongoose.Schema({

    friend1_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    friend2_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    accepted: Boolean

});

module.exports = mongoose.model('Friendship', friendshipSchema);