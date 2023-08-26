'use strict';

const Obniz = require('obniz');
const obniz = new Obniz("3823-2572");

obniz.onconnect = async function () {
    obniz.display.clear();
    obniz.display.print('Hello World!');
    console.log('hello~');
};