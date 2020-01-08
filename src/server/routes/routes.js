const axios = require('axios');

const routes = function (app) {
  app.get("/prices", async function (req, res) {
    const { from, to, date } = req.query;
    const url = `https://www.vr.fi/cs/Satellite?pagename=vrweb_hintakalenteri&action=getPrices&mista=${from}&minne=${to}&lahtee=${date}`;
    const prices = await axios.get(url);
    res.status(200).send(prices.data);
  });
}

module.exports = routes;