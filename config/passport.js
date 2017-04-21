var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userModel');

module.exports = function(passport){
    //serialize user id to session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    //deserialize userid
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //LOCAL SIGNUP
    passport.use('local-signup', new LocalStrategy({
        //change default to usermodel
        usernameField: 'email',
        passwordField: 'password',
        //pass back entire req to callback
        passReqToCallback: true
    }, function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'local.email': email }, function(err, user){
                //done(error, user/false, message) 
                if(err) return done(err);
                if(user) {
                    //if user is taken
                    return done(null, false, req.flash('signupMessage', 'email already taken'));
                } else {
                    //if no user with email
                    //create new user
                    var newUser = new User();
                    //set credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null, newUser);
                    })
                }

            })
        })
    }));
    //LOCAL LOGIN
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },function(req, email, password, done){
        User.findOne({'local.email': email}, function(err, user){
            if(err) throw err;
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'Incorrect email'));
            }
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Incorrect password'));
            }
            return done(null, user);
        });
    }));

}//end of module