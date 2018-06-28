const { BAD_REQUEST } = require('http-status-codes');

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const app = express();
const { API_PORT } = process.env;

app.use(morgan('combined', { skip: (_, res) => res.statusCode < BAD_REQUEST }));
app.use(cors()); // Used to cheat 'Same Origem Policy' from browsers

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebook_api_key,
  clientSecret:config.facebook_api_secret ,
  callbackURL: config.callback_url
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

app.listen(parseInt(API_PORT, 10), () => {
  console.log(`CraftFolioGotchi up and running at 0.0.0.0:${API_PORT}... :)`);
});
