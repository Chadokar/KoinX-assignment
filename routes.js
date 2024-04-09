const router = require("express").Router();
const exchanger = require("./controllers/exchange");
const companies = require("./controllers/companies");
const CurrencyHandler = require("./scrypt");

router.get("/", (req, res) => {
  res.json({ message: "Running" });
});

// this was first script to add the data in the database
router.get("/addCurrency", CurrencyHandler.AddCurrency);

router.get("/exchange-price", exchanger);

router.get("/companies/public_treasury", companies);

module.exports = router;
