'use strict'

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async () => {
    const servo = obniz.wired('ServoMotor', {signal:2});

    const main = async () => {
        servo.angle(0);
        await obniz.wait(1000);
        servo.angle(180); // half position
        await obniz.wait(1000);
    }

    setInterval(main, 1000);
}