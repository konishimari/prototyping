'use strict';

const Obniz = require('obniz');
const obniz = new Obniz("6788-5157");

obniz.onconnect = async function () {

// スピーカーを呼び出す
const speaker = obniz.wired('Speaker', {signal:0, gnd:1});

// ピンのオブジェクトを先に取得
const ledPlus = obniz.io10;
const ledMinus = obniz.io11;

// ピンを出力モードに設定し、LEDを初期状態にする
ledPlus.output(false);
ledMinus.output(false);

  async function playAndIlluminate(freq, duration, pause) {
      ledPlus.output(true);  // LEDをONにする
      speaker.play(freq); // 音を鳴らす
      await obniz.wait(duration); // durationミリ秒待つ
      speaker.stop(); // 音を止める
      ledPlus.output(false); // LEDをOFFにする
      await obniz.wait(pause); // pauseミリ秒待つ
  }

  await playAndIlluminate(1244.508, 400, 600); 
  await playAndIlluminate(1244.508, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(2093.005, 400, 600);
  await playAndIlluminate(2093.005, 400, 600);
  await playAndIlluminate(1864.655, 1000, 1000);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1396.913, 400, 600);
  await playAndIlluminate(1396.913, 400, 600);
  await playAndIlluminate(1244.508, 1000, 1000);

  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1396.913, 1000, 1000);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1661.219, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1567.982, 400, 600);
  await playAndIlluminate(1396.913, 1000, 1000);

  await playAndIlluminate(1244.508, 400, 600); 
  await playAndIlluminate(1244.508, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(1864.655, 400, 600);
  await playAndIlluminate(2093.005, 400, 800);
  await playAndIlluminate(2093.005, 400, 850);
  await playAndIlluminate(1864.655, 1000, 1100);
  await playAndIlluminate(1661.219, 400, 700);
  await playAndIlluminate(1661.219, 400, 750);
  await playAndIlluminate(1567.982, 400, 750);
  await playAndIlluminate(1567.982, 400, 900);
  await playAndIlluminate(1396.913, 400, 1100);
  await playAndIlluminate(1396.913, 400, 1100);
  await playAndIlluminate(1244.508, 1100, 400);

  await playAndIlluminate(1318.510, 100, 5);
  await playAndIlluminate(1396.913, 100, 5);
  await playAndIlluminate(1479.978, 100, 5);
  await playAndIlluminate(1567.982, 100, 5);
  await playAndIlluminate(1661.219, 105, 5);
  await playAndIlluminate(1760.000, 105, 10);
  await playAndIlluminate(11864.655, 200, 10);

  await playAndIlluminate(1046.502, 900, 100); 
  await playAndIlluminate(2093.005, 900, 100);
  await playAndIlluminate(1864.655, 900, 100);
  await playAndIlluminate(1760.000, 900, 100);
  await playAndIlluminate(1479.978, 900, 100);
  await playAndIlluminate(1567.982, 900, 100);
  await playAndIlluminate(2349.318, 1950, 50);
  await playAndIlluminate(1318.510, 900, 100);
  await playAndIlluminate(2637.020, 900, 100);
  await playAndIlluminate(2349.318, 900, 100);
  await playAndIlluminate(2093.005, 900, 100);
  await playAndIlluminate(1975.533, 900, 100);
  await playAndIlluminate(2093.005, 900, 100);
  await playAndIlluminate(2793.826, 2000, 10);

  await playAndIlluminate(3135.963, 900, 100); 
  await playAndIlluminate(2793.826, 900, 100);
  await playAndIlluminate(2637.020, 900, 100);
  await playAndIlluminate(2349.318, 900, 100);
  await playAndIlluminate(2093.005, 900, 100);
  await playAndIlluminate(1864.655, 900, 100);
  await playAndIlluminate(1760.000, 900, 100);
  await playAndIlluminate(1567.982, 900, 100);
  await playAndIlluminate(2349.318, 1950, 50);
  await playAndIlluminate(2637.020, 1950, 50);
  await playAndIlluminate(2793.826, 3500,1000);


  // ディスプレイ処理
  obniz.display.clear();  // 一旦クリアする
  obniz.display.print('Twinkle Twinkle Little Star');  // 文字を出す
}
