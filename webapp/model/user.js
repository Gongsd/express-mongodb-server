const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userScheam = mongoose.Schema({
    userName : {type: String, require : true, unique : true},
    password : {type:String, require : true}
});



userScheam.pre('save', function(next){
    let user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function(err, hash){
                if(err){
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }else{
        return next()
    }
})

userScheam.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}

const user = module.exports = mongoose.model('User', userScheam)