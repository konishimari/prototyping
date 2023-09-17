const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});
  
async function main() {

  const response = await openai.images.generate({
    prompt: "dancing panda",
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data[0].url); // URLが発行されます。

}

main();