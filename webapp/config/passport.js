var JwtStrategy =  require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../model/user');
var settings = require('../config/settings');

// module.exports = function(passport){
//     var opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//     opts.secretOrkey = settings.secret;
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done){
//         User.findOne({
//             userName : jwt_payload.userName
//         }, function(err, user){
//             if(err){
//                 return done(err, false)
//             }
//             if(user){
//                 done(null, user)
//             }else{
//                 done(null, false)
//             }
//         });
//     }));
// }

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({
          username: jwt_payload.username
          // id: jwt_payload.id
      }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
  };