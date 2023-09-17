'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
const Obniz = require('obniz');

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
const obniz = new Obniz('6788-5157'); // Obnizを初期化

async function handleEvent(event) {
    if (event.type !== 'message') {
        return Promise.resolve(null);
    }

    if (event.message.text === 'そうですね') {
        // お返事のメッセージを送信
        const replyMessage = {
            type: 'text',
            text: 'これで元気出してください。',
        };

        // イメージ画像のURLを取得
        const imageUrl = await getImageUrlBasedOnTemperature();

        // イメージ画像を送信
        await client.replyMessage(event.replyToken, [replyMessage, { type: 'image', originalContentUrl: imageUrl, previewImageUrl: imageUrl }]);
    }
}

async function getImageUrlBasedOnTemperature() {
    // ここで気温を取得する処理を実装してください
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });

    return new Promise((resolve, reject) => {
        tempsens.onchange = function (temp) {
            console.log(temp);
            obniz.display.clear();
            obniz.display.print(temp);

            let image = '';

            if (temp <= 30) {
                image = 'https://mystyle.ucc.co.jp/magazine/wp-content/uploads/2021/04/9582_02.jpg';
            } else if (temp > 30 && temp <= 33) {
                image = 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQ9yRs_KZK0RLtAp7jUZZg7Es-cOpdSrJKG-hMXjXf3-sIIBs7jqEOdQkNhdYKifWd9';
            } else if (temp > 33 && temp <= 35) {
                image = 'https://pbs.twimg.com/media/DjL-Y74VAAADPzx.jpg';
            } else if (temp > 35 && temp <= 36) {
                image = 'https://cdn.macaro-ni.jp/assets/img/shutterstock/shutterstock_155354765.jpg';
            } else if (temp > 36 && temp <= 37) {
                image = 'https://api.mediacms.jp/uploads/medium_image9_34814d9dfc.jpeg';
            } else if (temp > 37 && temp <= 38) {
                image = 'https://img.pretty-online.jp/wp-content/uploads/2023/06/30184449/gourmet_nara_kakigori_eye3.jpg.webp';
            } else if (temp > 38 && temp <= 39) {
                image = 'https://www.aco-mom.com/images/izakaya/2015/20160121-izakaya-nabeyaki-udon-100.jpg';
            } else if (temp > 39 && temp <= 40) {
                image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Korean_stew-Kimchi_jjigae-01.jpg/480px-Korean_stew-Kimchi_jjigae-01.jpg';
            }

            resolve(image);
        };
    });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
