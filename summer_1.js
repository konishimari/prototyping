'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const Obniz = require('obniz');
const {google} = require('googleapis');

const sheets = google.sheets('v4');

async function appendToSheet(values) {
    const auth = new google.auth.OAuth2(
        YOUR_CLIENT_ID,
        YOUR_CLIENT_SECRET,
        'urn:ietf:wg:oauth:2.0:oob'
    );

const PORT = process.env.PORT || 3000;
auth.setCredentials({
    access_token: YOUR_ACCESS_TOKEN,
    refresh_token: YOUR_REFRESH_TOKEN
});

const sheetId = 'YOUR_SHEET_ID';
await sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: sheetId,
    range: 'Sheet1', // 例: A列の次の空き行にデータを追加
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
        values: [values]
    }
});
}
const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));
app.post('/webhook', line.middleware(config), async (req, res) => {
    try {
        await Promise.all(req.body.events.map(handleEvent));
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

const client = new line.Client(config);
const obniz = new Obniz("6788-5157");


const temp = await tempsens.getWait();
await appendToSheet([new Date().toISOString(), temp]);  // 例: 現在の日付と温度をスプレッドシートに追加



async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const text = event.message.text.trim().toLowerCase();
    if (text === '暑いね') {
        await obniz.connect(); // Obnizと接続する

        const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
        const temp = await tempsens.getWait(); // 温度センサの値を取得

        if (temp >= 30) {
            await client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'そうだね。🍺これで癒されてね'
            });
        } else {
            await client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'でも、🍠秋はもうすぐだね'
            });
        }
        obniz.display.clear();
        obniz.display.print(temp);
    } else {
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: '”暑いね”って言ってみて'
        });
    }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
