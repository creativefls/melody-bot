const { LineBot, MongoSessionStore, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

require('dotenv').config()

const config = require('./bottender.config.js').line;
const text = require('./lib/text')

const mongoString = process.env.MONGO_STRING || 'mongodb://localhost:27017/lineBot'

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
  sessionStore: new MongoSessionStore(mongoString, { collectionName: 'lineBotSession' }),
});

const handler = new LineHandler()
  .onText(/hai melody/i, async context => {
    await context.sendText(text.greeting(context));
  })
  .onText(/^melody/i, async context => {
    await context.sendText(text.help(context));
  })
  .onText(/^mel/i, async context => {
    let splitChatText = context.event.text.split(' ')
    if (splitChatText[1] == 'cari') {
      await context.sendText('oke wait. \nmulai mencari email dan nama...');
      let txtSearch = splitChatText[2]
      let msg = await require('./request/search')(txtSearch)
      await context.sendText(msg);
    } else {
      if (context.event.text.indexOf('tampan') > -1) {
        await context.sendText('awhh tampan sekaleee :* :*');
      } else if (context.event.text.indexOf('ganteng') > -1) {
        await context.sendText('ganteng bingit kak :* :*');
      } else if (context.event.text.indexOf('cantik') > -1) {
        await context.sendText('cantikan aku lah :p');
      } else {
        await context.sendText('ya kak?');
      }
    }
  })
  .onText(/^pengumuman/i, async context => {
    let email = context.event.text.split(' ')[1]
    let msg = await require('./request/get-announcement')(email)
    await context.sendText(msg);
  })
  .onText(/^hesoyamwkwkwk/i, async context => {
    let msg = JSON.stringify(context.session.user)
    await context.sendText(msg);
  })
  .onEvent(async context => {
    console.log('>> chat dari', context.session.user);
    if (context.event.isFollow) {
      await context.sendText('Halo kak, aku Melody. Salam kenal!');
    } else if (context.event.isJoin) {
      await context.sendText('Halo kakak-kakak, aku Melody. Salam kenal!');
    } else {
      if (!context.event.source.groupId && !context.event.source.roomId) {
        await context.sendText("Duh, bingung mau jawab apa");
      }
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

let port = process.env.PORT || 5000
server.listen(port, () => {
  console.log('server is running on 5000 port...');
  console.log('token ', config.accessToken)
  console.log('secet ', config.channelSecret)
});
