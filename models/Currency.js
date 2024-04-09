const mongoose = require("mongoose");
const { Schema } = mongoose;

const CurrencySchema = new Schema({
  name: String,
  symbol: String,
  currencyId: {
    type: String,
    unique: true,
  },
});

const Currency = mongoose.model("Currency", CurrencySchema);

module.exports = Currency;
