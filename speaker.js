'use strict'

const Obniz = require('obniz');
const obniz = new Obniz("3823-2572");

obniz.onconnect = async function () {

  // スピーカーを呼び出す
  const speaker = obniz.wired('Speaker', {signal:0, gnd:1});
  speaker.play(261.626); //ドの音
await obniz.wait(1000); //1秒待つ
  speaker.play(261.626); //ドの音
await obniz.wait(1000); //1秒待つ
speaker.play(392.00); //ソの音
await obniz.wait(1000); //1秒待つ
speaker.play(392.00); //ソの音
await obniz.wait(1000); //1秒待つ
speaker.play(440.00); //ソの音
await obniz.wait(1000); //1秒待つ
speaker.play(440.00); //ソの音
await obniz.wait(1000); //1秒待つ
speaker.play(392.00); //ソの音
await obniz.wait(1000); //1秒待つ

  // ディスプレイ処理
  obniz.display.clear();  // 一旦クリアする
  obniz.display.print('Hello obniz!');  // Hello obniz!という文字を出す


  }


