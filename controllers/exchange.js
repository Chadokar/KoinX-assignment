const Currency = require("../models/Currency");
const axios = require("axios");

const exchanger = async (req, res) => {
  let { fromCurrency, toCurrency, date } = req.query;
  try {
    const fromCrypto = await Currency.findOne({ currencyId: fromCurrency });
    const toCrypto = await Currency.findOne({ currencyId: toCurrency });
    if (!fromCrypto || !toCrypto) {
      return res.status(400).json({ error: "Invalid currency id(s)" });
    }

    if (!date) {
      const today = new Date().toISOString().split("T")[0];
      const [year, month, day] = today.split("-");
      date = `${day}-${month}-${year}`;
    }

    const fromCryptoPriceInUSD = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false`
    );

    const toCryptoPriceInUSD = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}&localization=false`
    );

    res.json({
      fromCurrency: fromCrypto.name,
      toCurrency: toCrypto.name,
      date,
      price:
        fromCryptoPriceInUSD.data.market_data.current_price["usd"] /
        toCryptoPriceInUSD.data.market_data.current_price["usd"],
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// there is one more way provided by the coingecko api to get the exchange rate

module.exports = exchanger;
