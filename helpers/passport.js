const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id,'-salt -password',function(err,user){
        done(err, user);
    })
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password,user.password, function(err,res){
            if(err || res === false){
                return done(null, false, { message: 'Incorrect password.' });
            }
        })

        return done(null, user);
      });
    }
));

module.exports = passport;
