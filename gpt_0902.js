'use strict';

const OpenAI = require('openai');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const OPENAIKEY = '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';
const openai = new OpenAI({
    apiKey: OPENAIKEY, // defaults to process.env["OPENAI_API_KEY"]
});

const config = {
    channelSecret: process.env.channelSecret, //LINE Botのシークレット
    channelAccessToken: process.env.channelAccessToken //LINE Botのアクセストークン
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
 	    console.error(err);
        res.status(500).end();
      });
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'あなたの名前は?' }],
    model: 'gpt-3.5-turbo',
  });

  const msg = completion.choices[0].message.content;
//   console.log(completion.choices[0].message.content);

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);