const { LineBot, MongoSessionStore, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

require('dotenv').config()

const config = require('./bottender.config.js').line;
const mongoString = process.env.MONGO_STRING || 'mongodb://localhost:27017/lineBot'

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
  sessionStore: new MongoSessionStore(mongoString, { collectionName: 'lineBotSession' }),
});

const handler = new LineHandler()
  .onFollow(true, async context => {
    await context.sendText('Halo, aku Melody. Salam kenal!');
  })
  .onText(/hai melody/i, async context => {
    let text = `Halo kak ${context.session.user.displayName}, lagi apa nih?`
    await context.sendText(text);
  })
  .onText(/pengumuman/i, async context => {
    let email = context.event.text.split(' ')[1]
    let text = await require('./request/get-announcement')(email)
    await context.sendText(text);
  })
  .onText(/hesoyamwkwkwk/i, async context => {
    let text = JSON.stringify(context.session.user)
    await context.sendText(text);
  })
  .onEvent(async context => {
    console.log('>> chat dari', context.session.user);

    if (!context.event.source.groupId && !context.event.source.roomId) {
      await context.sendText("Duh, bingung mau jawab apa");
    }
  })
  .onError(async (context, err) => {
    console.log('>> error chat', err);
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);

server.get('/', (req, res) => {
  res.json({hello: 'hello world'})
})

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
  console.log('token ', config.accessToken)
  console.log('secet ', config.channelSecret)
});
