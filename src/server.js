'use strict';

import path from 'path';
import { Server } from 'http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Mongoose from './serv/dbconfig';
import Races from './serv/schemas/races';
import User from './serv/schemas/users';
import UserHelpers from './serv/dbhelpers/UserHelpers';
import RaceHelpers from './serv/dbhelpers/RaceHelpers';
import Results from './serv/schemas/results';
import passport from 'passport';
import util from './config/utility';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
/* Need this for material UI */
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import gcloud from 'google-cloud';
import gCred from './config/gcloud/cred';
import fileUpload from 'express-fileupload';

//passport
var Strategy = require('passport-facebook').Strategy;

// production facebook auth info
if (process.env.NODE_ENV === 'production') {
  console.log('>>in production environment');
  passport.use(new Strategy({
    clientID: '630724287121611',
    clientSecret: '39b0e9bbb91cdb757f264099dff78b0b',
    callbackURL: 'https://hella-amazing-race.herokuapp.com/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
  },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));
  
} else {  // local development facebook auth info (test app)
  console.log('>>in development environment');
  passport.use(new Strategy({
    clientID: '1016193961847191',
    clientSecret: '3b7240f21274cefcdc425d318a55e43d',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(small)']
  },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));
}

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//gcloud Authenticating
var gcloud = require('google-cloud')({
  projectId: gCred.projectId,
  credentials: __dirname + '/src/config/gcloud/quoted-hella-keyFile.json',
  key: gCred.key
});


// server setup
const app = new express();
const server = new Server(app);
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser('shhhh, very secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// passport routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // on successful login check user credentials and store in DB if not found yet.
    // console.log('FACEBOOK USER',req.user)
    // console.log('Picture!!!!', req.user._json.picture.data.url)
    UserHelpers.checkUserIfNewAndCreate(req.user.id, req.user.displayName, req.user.photos[0].value)
      .then(res.redirect('/home'))
      .catch((err) => {
        console.log(err);
      });
  });


///// GET Requests /////

// get user displayName on successful login
app.get('/username', util.isLoggedIn, (req, res) => {
  res.send(req.user);
});

// wildcard route for react routing
app.get('*', util.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index-static.html'));
});

///// POST Requests /////

// store saved race

app.post('/saveRace', RaceHelpers.storeSavedRace);

app.post('/loadRace', RaceHelpers.loadRaceData);

app.post('/saveRaceResults', RaceHelpers.saveRaceResults);

app.post('/loadRaceResults', RaceHelpers.loadRaceResults);

app.post('/analyzePhoto', RaceHelpers.analyzePhoto);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});
