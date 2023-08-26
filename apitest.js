// axiosライブラリを呼び出す
const axios = require('axios');

const main = async () => {
  try {
    const res = await axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=80');
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

main(); //main関数を実行