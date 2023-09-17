const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async function () {
    // 超音波測距センサとスピーカーを利用する
    const hcsr04 = obniz.wired('HC-SR04', { gnd: 0, echo: 1, trigger: 2, vcc: 3 });
    const speaker = obniz.wired('Speaker', { signal: 9, gnd: 10 });

    // ディスプレイ
    obniz.display.clear(); // クリア
    obniz.display.print('Hello obniz!');

    // @line/bot-sdk モジュールの読み込み
    const line = require('@line/bot-sdk');
    const PORT = process.env.PORT || 3000;

    // LINE Botの設定
    const lineConfig = {
        channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
        channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
    };

    // LINEクライアントの初期化
    const lineClient = new line.Client(lineConfig);

    // setIntervalで一定間隔で処理
    setInterval(async function () {
        // 距離を取得
        let distance = await hcsr04.measureWait();

        // 音を鳴らす
        if (1 <= distance && distance <= 200) {
            speaker.play(700);

            // LINEメッセージを送信
            const message = {
                type: 'text',
                text: 'ココちゃん、水飲んでまーす'
            };

            // LINEにメッセージを送信
            await lineClient.pushMessage('konishimari', message);
        } else if (200 < distance) {
            speaker.stop();
        }

        // 距離(mm)をターミナルに表示
        console.log(distance + ' mm');
        // obnizディスプレイに表示
        // 一度消してから距離+mmの単位を表示
        obniz.display.clear();
        obniz.display.print(distance + ' mm');

    }, 500); // = 0.5秒おきに実行
};
