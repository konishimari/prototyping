'use strict'

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async () => {
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
    const led = obniz.wired("LED", {anode: 3, cathode: 4}); // LEDのピン番号を適切に指定
    const speaker = obniz.wired('Speaker', {signal:9, gnd:10}); // スピーカーのピン番号を適切に指定
    
    tempsens.onchange = function (temp) {
        console.log(temp);
        obniz.display.clear();
        obniz.display.print(temp);

        if (temp >= 30) {
            led.on(); // LEDを点灯
            speaker.play(800); // スピーカーから音を出す
        } else {
            led.off(); // LEDを消灯
            speaker.stop(); // スピーカーの音を止める
        }
    };
}