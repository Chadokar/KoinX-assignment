const axios = require("axios");

module.exports = async function (req, res) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/companies/public_treasury/${req.query.id}`
    );
    res.json(response.data?.companies || []);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
