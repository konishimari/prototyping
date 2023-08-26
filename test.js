'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));
app.post('/webhook', line.middleware(config), (req, res) => {
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
    if (event.type !== 'message') {
        return Promise.resolve(null);
    }

    if (event.message.text === '一緒にご飯食べよう') {
        // Request user's location
        const locationMessage = {
            type: 'text',
            
            text: 'はーい、待ってたよ。じゃあ 位置情報を送って〜！',
            quickReply: {
                items: [
                    {
                        type: 'action',
                        action: {
                            type: 'location',
                            label: '位置情報を送信'
                        }
                    }
                ]
            }
        };
        return client.replyMessage(event.replyToken, locationMessage);
    }

    if (event.message.type === 'location') {
        return client.replyMessage(event.replyToken, {
            type: 'sticker',
            packageId: '8515', // スタンプのパッケージID
            stickerId: '16581242' // スタンプのID
        });
    }
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '”一緒にご飯食べよう”って言って'
      });
    }



app.listen(PORT);
console.log(`Server running at ${PORT}`);