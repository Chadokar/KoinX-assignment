const Currency = require("./models/Currency");
const axios = require("axios");
const { sendingMail } = require("./utils");

const AddCurrency = async (req, res) => {
  try {
    // const data = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    // const currency = data.data;
    // const currencyArray = [];
    // currency.forEach((element) => {
    //   currencyArray.push({
    //     name: element.name,
    //     symbol: element.symbol,
    //     currencyId: element.id,
    //   });
    // });
    // await Currency.insertMany(currencyArray);

    res.json({ message: "Data inserted successfully" });
  } catch (err) {
    console.log(err);
  }
};

const UpdateCurrency = async () => {
  try {
    const data = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    const currency = data.data;
    const currencyArray = [];
    currency.forEach((element) => {
      currencyArray.push({
        name: element.name,
        symbol: element.symbol,
        currencyId: element.id,
      });
    });
    Currency.deleteMany().then(async () => {
      Currency.insertMany(currencyArray).then(async () => {
        await sendingMail({
          to: "shubhamchadokar36@gmail.com",
          subject: "DATA UPDATED SUCCESSFULLY",
          text: `Your data has been updated successfully.`,
        });
        console.log("Message : Data updated successfully");
      });
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { AddCurrency, UpdateCurrency };
