const axios = require('axios'); //追記
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '15302ba8f1361e2dbc0962d7fc4f8371',
    channelAccessToken: 'SyZBg+7gikk2Be93fdtBPJAryUyfxGr/HtXsWd7QZx2qeL01A63GD1BK1w8Zhh3z13znIrWviLNHD38+xRNwCiFwjzLw6P8InsBKctqvztiziRmm2hb1krwVcDT9bKdh6173BCCBlKoivSirCB35OAdB04t89/1O/w1cDnyilFU='
};
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: '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',
});

const prompt = {
    role: 'user',
    content: process.env.USERTEXT, //ターミナルから実行時に命令を入力して受ける
};

//盛岡の天気を取得する関数
const getMoriokaWeather = async () => {
	return '晴れです。';
}

//実行
const main = async () => {
    const gptOptions = {
        model: "gpt-4-0613",
        messages: [prompt],
        function_call: "auto",
        functions: [
            {
                name: "getMoriokaWeather",
                description: "盛岡の天気を取得",
                parameters: {
                    type: "object",
                    properties: {}
            },
          },
        ],
    }
    
    const completion = await openai.chat.completions.create(gptOptions);
    console.log(completion.choices[0]);
}


main(); //実行
