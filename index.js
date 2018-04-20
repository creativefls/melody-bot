const { LineBot, MongoSessionStore } = require('bottender');
const { createServer } = require('bottender/express');
require('dotenv').config()

const config = require('./bottender.config.js').line;

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
  sessionStore: new MongoSessionStore('mongodb://localhost:27017/'),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
  console.log('token ', config.accessToken)
  console.log('secet ', config.channelSecret)
});
