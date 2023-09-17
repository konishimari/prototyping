const Obniz = require('obniz');
const obniz = new Obniz("6788-5157"); // obnizIDに自分のIDを入れます

obniz.onconnect = async function () {
  // LEDの設定
  const led = obniz.wired("LED", {anode: 0, cathode: 1});

  // LEDを1秒光らせてから2秒消す関数
  async function blinkLED() {
    led.on(); // LEDを点灯
    await obniz.wait(1000); // 1000ミリ秒（1秒）待つ
    led.off(); // LEDを消灯
    await obniz.wait(2000); // 2000ミリ秒（2秒）待つ
    led.on(); // LEDを再び点灯
    await obniz.wait(1000); // 1000ミリ秒（1秒）待つ
    blinkLED(); // 再び関数を呼び出してLEDを点滅させる
  }

  blinkLED(); // 点滅関数を最初に呼び出す
}