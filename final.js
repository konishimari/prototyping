'use strict';

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");
const express = require('express');
const line = require('@line/bot-sdk');

const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};

const client = new line.Client(config);

obniz.onconnect = async function () {
        // スピーカーを呼び出す
        const speaker = obniz.wired('Speaker', {signal:0, gnd:1});
        
        // ピンのオブジェクトを先に取得
        const ledPlus = obniz.io10;
        const ledMinus = obniz.io11;
        
        // ピンを出力モードに設定し、LEDを初期状態にする
        ledPlus.output(false);
        ledMinus.output(false);
        
          async function playAndIlluminate(freq, duration, pause) {
              ledPlus.output(true);  // LEDをONにする
              speaker.play(freq); // 音を鳴らす
              await obniz.wait(duration); // durationミリ秒待つ
              speaker.stop(); // 音を止める
              ledPlus.output(false); // LEDをOFFにする
              await obniz.wait(pause); // pauseミリ秒待つ
          }
        
          await playAndIlluminate(1244.508, 400, 600); 
          await playAndIlluminate(1244.508, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(2093.005, 400, 600);
          await playAndIlluminate(2093.005, 400, 600);
          await playAndIlluminate(1864.655, 1000, 1000);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1396.913, 400, 600);
          await playAndIlluminate(1396.913, 400, 600);
          await playAndIlluminate(1244.508, 1000, 1000);
        
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1396.913, 1000, 1000);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1661.219, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1567.982, 400, 600);
          await playAndIlluminate(1396.913, 1000, 1000);
        
          await playAndIlluminate(1244.508, 400, 600); 
          await playAndIlluminate(1244.508, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(1864.655, 400, 600);
          await playAndIlluminate(2093.005, 400, 800);
          await playAndIlluminate(2093.005, 400, 850);
          await playAndIlluminate(1864.655, 1000, 1100);
          await playAndIlluminate(1661.219, 400, 700);
          await playAndIlluminate(1661.219, 400, 750);
          await playAndIlluminate(1567.982, 400, 700);
          await playAndIlluminate(1567.982, 400, 900);
          await playAndIlluminate(1396.913, 400, 1100);
          await playAndIlluminate(1396.913, 400, 1100);
          await playAndIlluminate(1244.508, 1300, 2000);
        
          await playAndIlluminate(1318.510, 100, 5);
          await playAndIlluminate(1396.913, 100, 5);
          await playAndIlluminate(1479.978, 100, 5);
          await playAndIlluminate(1567.982, 100, 5);
          await playAndIlluminate(1661.219, 105, 5);
          await playAndIlluminate(1760.000, 110, 10);
          await playAndIlluminate(11864.655, 200, 100);
          // await playAndIlluminate(11975.533, 200, 80);
        
          await playAndIlluminate(1046.502, 900, 100); 
          await playAndIlluminate(2093.005, 900, 100);
          await playAndIlluminate(1864.655, 900, 100);
          await playAndIlluminate(1760.000, 900, 100);
          await playAndIlluminate(1479.978, 900, 100);
          await playAndIlluminate(1567.982, 900, 100);
          await playAndIlluminate(2349.318, 1950, 50);
          await playAndIlluminate(1318.510, 900, 100);
          await playAndIlluminate(2637.020, 900, 100);
          await playAndIlluminate(2349.318, 900, 100);
          await playAndIlluminate(2093.005, 900, 100);
          await playAndIlluminate(1975.533, 900, 100);
          await playAndIlluminate(2093.005, 900, 100);
          await playAndIlluminate(2793.826, 2000, 10);
        
          await playAndIlluminate(3135.963, 900, 100); 
          await playAndIlluminate(2793.826, 900, 100);
          await playAndIlluminate(2637.020, 900, 100);
          await playAndIlluminate(2349.318, 900, 100);
          await playAndIlluminate(2093.005, 900, 100);
          await playAndIlluminate(1864.655, 900, 100);
          await playAndIlluminate(1760.000, 900, 100);
          await playAndIlluminate(1567.982, 900, 100);
          await playAndIlluminate(2349.318, 1950, 50);
          await playAndIlluminate(2637.020, 1950, 50);
          await playAndIlluminate(2793.826, 3500,1000);
        
        
          // ディスプレイ処理
          obniz.display.clear();  // 一旦クリアする
          obniz.display.print('Twinkle Twinkle Little Star');  // 文字を出す

          await sendLineMessage();
        }

    // LINEにメッセージを送信する関数
    async function sendLineMessage() {
        try {
            await client.pushMessage('Ub62809be7cd715a77e6d28cec8fedd1f', {
                type: 'text',
                text: 'おやすみなさい。よい夢を',
            });
            console.log('Message sent!');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

// 以下、expressや他のサーバの設定が必要であれば追加する

const app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
