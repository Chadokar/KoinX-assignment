const router = require("express").Router();
const Currency = require("./models/Currency");

const axios = require("axios");
const CurrencyHandler = require("./scrypt");

router.get("/", (req, res) => {
  res.json({ message: "Running" });
});

router.get("/addCurrency", CurrencyHandler.AddCurrency);

router.get("/exchange-price", async (req, res) => {
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

    const fromCryptoUsd =
      fromCryptoPriceInUSD.data.market_data.current_price["usd"];

    const toCryptoPriceInUSD = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}&localization=false`
    );

    const toCryptoUsd =
      toCryptoPriceInUSD.data.market_data.current_price["usd"];

    const price = fromCryptoUsd / toCryptoUsd;

    res.json({
      fromCurrency: fromCrypto.name,
      toCurrency: toCrypto.name,
      date,
      price,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/companies/public_treasury", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/companies/public_treasury/${req.query.id}`
    );
    res.json(response.data?.companies || []);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
