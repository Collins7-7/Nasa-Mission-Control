const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://Collo:GeQWygaN3b78R2W9@nasacluster.lokwt5g.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is established");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
