'use strict';

const axios = require('axios');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

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

  if (event.message.text === 'ありがとう') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'はーい😊 またきてね'
    });
  }

  if (event.message.text === '癒やされたいわん') {
    let replyText = 'おつかれさま♡ 　はい、どうぞ😊';
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });

    // axiosを使ってわんこAPIにアクセス
    const dogURL = 'https://api.thedogapi.com/v1/images/search';
    const dogRes = await axios.get(dogURL);
    const dogImageUrl = dogRes.data[0].url; // ランダムに取得した犬の画像URL

    // 犬の画像をプッシュメッセージとして送信
    await client.pushMessage(event.source.userId, {
      type: 'image',
      originalContentUrl: dogImageUrl,
      previewImageUrl: dogImageUrl
    });

    return;
  }

  if (event.message.text === 'いらにゃい') {
    let replyText = '本当に？ これでも？';
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });

  // axiosを使って猫のAPIにアクセス
  const catURL = 'https://api.thecatapi.com/v1/images/search';
  const catRes = await axios.get(catURL, {
    headers: {
      'x-api-key': 'live_yxn5LyUZmbnBi7tZirlaAwOvNSxMT2wZrT9bgglvV0Y8XozxZIqwwcfVJ3MFOjff' // ここに猫のAPIのAPIキーを指定
    }
  });
  const catImageUrl = catRes.data[0].url; // ランダムに取得した猫の画像URL

    // 猫の画像をプッシュメッセージとして送信
    await client.pushMessage(event.source.userId, {
      type: 'image',
      originalContentUrl: catImageUrl,
      previewImageUrl: catImageUrl
    });

    return;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: '"癒やされたいわん"　"いらにゃい"　どっちの気分？'
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
