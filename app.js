'use strict';

const axios = require('axios'); //追記
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。


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

  //"天気教えて"以外の場合は反応しない
  if(event.message.text !== '天気教えて') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '"天気教えて"とゆーておくれやす'
    });
  }

  let replyText = '';
  replyText = 'へぇ、ちょっと待っておくれやすー'; //"ちょっと待ってね"ってメッセージだけ先に処理
  await client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
  });

    // 2秒待機
  await sleep(2000);

  //axiosを使って天気APIにアクセス
  const CITY_ID = `260010`; //京都のIDを指定
      const URL = `https://weather.tsukumijima.net/api/forecast?city=${CITY_ID}`;
  const res = await axios.get(URL);
  const pushText = res.data.description.text;
  return client.pushMessage(event.source.userId, {
      type: 'text',
      text: pushText,
  });
}
// 指定した時間だけ待機する関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);