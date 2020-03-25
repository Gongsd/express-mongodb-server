const mongoose = require('mongoose')


const newsSchema = mongoose.Schema({
    title : {type : String, required : true},
    poster : String,
    content : String,
    author : String,
    createTime : {type : Date, default : Date.now.toString},
    updateTime : {type : Date, default : Date.now.toString}
})

const News = module.exports = mongoose.model('News', newsSchema)