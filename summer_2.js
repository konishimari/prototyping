'use strict';

const axios = require('axios');
const Obniz = require('obniz');
const { Client } = require('messaging-api-line'); // LINE Messaging APIのライブラリを利用

const obniz = new Obniz("6788-5157");// ここにObnizのIDを入力
const lineConfig = {
    accessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU=', // ここにLINE Botのアクセストークンを入力
};
const lineClient = new Client(lineConfig);
const PORT = process.env.PORT || 3000;

obniz.onconnect = async () => {
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });

    tempsens.onchange = async function (temp) {
        console.log(temp);
        obniz.display.clear();
        obniz.display.print(temp);

        let message = 'こんにちは'; // 初期メッセージ

        if (temp <= 25) {
            message = '秋も近いですね';
        } else if (temp <= 27) {
            message = '気持ちのいい日ですね';
        } else if (temp <= 29) {
            message = '夏休みは取れましたか';
        } else if (temp <= 31) {
            message = 'まだまだ暑いですね';
        } else {
            message = '残暑厳しいですね';
        }

        // LINE Botにメッセージを送信
        await lineClient.replyText(event.replyToken, message);
    };
};
