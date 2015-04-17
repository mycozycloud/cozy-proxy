// Generated by CoffeeScript 1.6.2
var LocalStrategy, User, bcrypt, passport;

bcrypt = require('bcrypt');

passport = require('passport');

LocalStrategy = require('passport-local').Strategy;

User = require('../models/user');

module.exports = function() {
  var options;

  passport.currentUser = null;
  passport.serializeUser = function(user, req, done) {
    return done(null, user._id);
  };
  passport.deserializeUser = function(id, req, done) {
    if ((passport.currentUser != null) && id === passport.currentUser._id) {
      return done(null, passport.currentUser);
    } else {
      return done(null, false);
    }
  };
  options = {
    usernameField: 'password'
  };
  return passport.use(new LocalStrategy(options, function(email, password, done) {
    return User.first(function(err, user) {
      if ((err != null) || (user == null)) {
        return done(err, false);
      } else {
        return bcrypt.compare(password, user.password, function(err, result) {
          if (err != null) {
            return done(err, false);
          } else if (result) {
            passport.currentUser = user;
            passport.currentUser.id = user._id;
            return done(err, user);
          } else {
            return done(err, false);
          }
        });
      }
    });
  }));
};
