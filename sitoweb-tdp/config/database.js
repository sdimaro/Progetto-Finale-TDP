const mongoose = require("mongoose");
require("dotenv").config(); // Carica le variabili da .env
console.log("URI Mongo:", process.env.MONGO_URI);

const uri = process.env.MONGO_URI; // URI presa da .env

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch((err) => console.error("❌ Errore MongoDB:", err));
