const generateAsync = require('stability-client').generateAsync

const main = async () => {
    try {
    const { res, images } = await generateAsync({
        prompt: 'Cats owned by wealthy people', //富裕層が飼ってるネコ
        apiKey: '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',
    })
    console.log(images)
    } catch (e) {
        console.log(e)
    }
}
main();
