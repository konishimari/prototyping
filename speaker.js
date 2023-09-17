'use strict'

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async function () {

  // スピーカーを呼び出す
  const speaker = obniz.wired('Speaker', {signal:0, gnd:1});

speaker.play(440); //ラの音
await obniz.wait(1000); //1秒待つ
speaker.play(440); //ラの音
await obniz.wait(1000); //1秒待つ
speaker.play(659.255); //ミの音
await obniz.wait(1000); //1秒待つ
speaker.play(659.255); //　ミの音
await obniz.wait(1000); //1.1秒待つ
speaker.play(739.989); //ファ＃の音
await obniz.wait(1000); //0.9秒待つ
speaker.play(739.989); //ファ＃の音
await obniz.wait(1000); //2秒待つ
speaker.play(659.255); //ミの音
await obniz.wait(1000); //1秒待つ
speaker.play(587.330); //レの音
await obniz.wait(1000); //1秒待つ
speaker.play(587.330); //レの音
await obniz.wait(1000); //1秒待つ
speaker.play(554.365); //ド＃の音
await obniz.wait(1000); //2秒待つ
speaker.play(554.365); //ド＃の音
await obniz.wait(1000); //2秒待つ
speaker.play(493.883); //シの音
await obniz.wait(1000); //2.2秒待つ
speaker.play(493.883); //シの音
await obniz.wait(1000); //1秒待つ
speaker.play(440.000); //ラの音
await obniz.wait(1000); //1秒待つ


  // ディスプレイ処理
  obniz.display.clear();  // 一旦クリアする
  obniz.display.print('Hello obniz!');  // Hello obniz!という文字を出す


  }


