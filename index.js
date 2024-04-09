// imports
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const schedule = require("node-schedule");

// webserver init
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());

// routes
app.use("/", require("./routes"));

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ message: `Can't find ${req.url} on the server` });
});

// schedule job
const { UpdateCurrency } = require("./scrypt");
schedule.scheduleJob("0 * * * *", UpdateCurrency);

async function main() {
  mongoose.connect(`${process.env.DATABASE_URL}`);
  mongoose.connection.on("error", (err) => {
    console.log("Error in connection to database : ", err);
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to the database");
    console.log(process.env.DATABASE_URL, " database url");
  });
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`Test on http://localhost:${PORT}/`);
  });
}

main();
