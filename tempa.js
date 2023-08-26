'use strict'

const Obniz = require('obniz');
const obniz = new Obniz("3823-2572");



obniz.onconnect = async () => {
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
    tempsens.onchange = function (temp) {
     console.log(temp);
     obniz.display.clear();
     obniz.display.print(temp); 
    };
}