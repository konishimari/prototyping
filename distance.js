const Obniz = require('obniz');
const obniz = new Obniz("6788-5157"); 

obniz.onconnect = async function () {
    // 超音波測距センサとスピーカーを利用する
    const hcsr04 = obniz.wired('HC-SR04', { gnd: 0, echo: 1, trigger: 2, vcc: 3 });
    const speaker = obniz.wired('Speaker', { signal: 9, gnd: 10 });

    // ディスプレイ
    obniz.display.clear(); // クリア
    obniz.display.print('Hello obniz!');
    // Hello obniz! と表示

    // setIntervalで一定間隔で処理
    setInterval(async function () {
        // 距離を取得
        let distance = await hcsr04.measureWait();

        //下のドを鳴らす
        if (1 <= distance && distance <= 250) {
            speaker.play(700);
        } else if (250 < distance) {
            speaker.stop();

        }

        // 距離(mm)をターミナルに表示
        console.log(distance + ' mm');
        // obnizディスプレイに表示
        // 一度消してから距離+mmの単位を表示
        obniz.display.clear();
        obniz.display.print(distance + ' mm');

    }, 200); // 200ミリ秒 = 0.2秒おきに実行
}
