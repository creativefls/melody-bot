const { LineBot, MongoSessionStore } = require('bottender');
const { createServer } = require('bottender/express');
require('dotenv').config()

const config = require('./bottender.config.js').line;

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
  sessionStore: new MongoSessionStore('mongodb://localhost:27017/lineBot'),
});

bot.onEvent(async context => {
  if (context.event.isFollow) {
    await context.sendText('Hello, welcome to this bot!');
  } else if (context.event.isText && context.event.text === 'How are you?') {
    await context.sendText('I am fine.');
  } else {
    await context.sendText('I do not understand.');
  }
  context.replyImage(
    'https://developers.line.me/media/messaging-api/messages/image-full-04fbba55.png',
    'https://developers.line.me/media/messaging-api/messages/image-full-04fbba55.png'
  );
});

const server = createServer(bot);

server.get('/', (req, res) => {
  res.json({hello: 'hello world'})
})

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
  console.log('token ', config.accessToken)
  console.log('secet ', config.channelSecret)
});
