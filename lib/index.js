import express from 'express';
import discord from './discord';

const port = process.env.PORT || 80;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

express()
  .set('trust proxy', true)
  .use('/login', discord({clientID, clientSecret}))
  .listen(port, () => console.log(`listening on ${port}`))
;