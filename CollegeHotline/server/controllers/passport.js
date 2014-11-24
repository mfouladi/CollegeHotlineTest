
var LocalStrategy   = require('passport-local').Strategy;
var Volunteer       = require('../models/volunteer');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
      Volunteer.find( {username: username}, function(err, user) {
        done(err, user);
      });
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Volunteer.findOne({ 'username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new Volunteer();

                        // set the user's local credentials
                        newUser.phoneNumber = req.body.phoneNumber;
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.online = true;
                        newUser.available = true;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });    

            });

        })
    );

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Volunteer.findOne({ 'username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    } 

                    if (!user.validPassword(password)){
                         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }

                     // set the user's local credentials
                    // create the user
                    var updateUser = {};
                    updateUser.online = true;
                    updateUser.available = true;

                    // save the user
                    Volunteer.update({ 'username' :  user.username }, 
                                    {$set : updateUser},
                                    function(err, result) {
                        if (err)
                            throw err;
                    });



                    return done(null, user);

                });    

            });

        })
    );

    

}