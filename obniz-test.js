'use strict';

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async function () {
    obniz.display.clear();
    obniz.display.print('Hello World!');
    console.log('hello~');
};