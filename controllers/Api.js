const axios = require('axios').default;
require('dotenv').config();
const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY;

const finAll = (req,res) => {
  let {limit, start} = {...req.query}
  console.log(limit, start)

  let config = {
    method: 'GET',
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}`,
    headers : {
      'X-CMC_PRO_API_KEY': COINMARKETCAP_KEY,
    }
  }
  axios({
    method: config.method,
    url: config.url,
    headers: config.headers
  }).then(response => {
    res.status(200).json(response.data)
  })
};

module.exports = {
  finAll
};
