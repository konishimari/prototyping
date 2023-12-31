'use strict';

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async () => {
    obniz.io0.output(true); //io0を5vに
    obniz.io2.output(false); //io2をGNDに

    //io1をアナログピンに
    obniz.ad1.start((voltage) => {
        console.log(`changed to ${voltage} v`);
    });
}