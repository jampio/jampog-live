import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-discord';

function verify(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

function success(req, res) {
  console.log(req.ip);
  console.log(req.user);
  res.send('SUCCESS');
}

export default ({clientID, clientSecret}) =>
  express.Router()
    .use(({baseUrl}, _, next) => {
      passport.use(new Strategy({
        callbackURL: `${baseUrl}/callback`,
        clientID, clientSecret, scope: 'identify'
      }, verify)); 
      next();
    })
    .use(passport.initialize())
    .get('/', passport.authenticate('discord'))
    .get('/callback', passport.authenticate('discord', {failureRedirect: '/', session: false}), success)
;