var mongoose = require('mongoose');

var imageSchema =  mongoose.Schema({
    image : {
        type : String,
        require : true
    },
    user : String
})

const Image = module.exports = mongoose.model('Image', imageSchema);