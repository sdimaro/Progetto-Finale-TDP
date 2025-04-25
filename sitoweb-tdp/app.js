const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const User = require("./models/User"); // Importa il modello User

const app = express();

// Connessione al database
require("./config/database");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "segreto_super_sicuro", // Sostituisci con una stringa più sicura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Se usi HTTPS, cambia secure a true
  })
);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware per l'utente corrente (modificato)
app.use(async (req, res, next) => {
  res.locals.currentUser = null;
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select(
        "username _id"
      );
      if (user) {
        res.locals.currentUser = {
          _id: user._id,
          username: user.username,
        };
      }
    } catch (err) {
      console.error("Errore nel recupero dell'utente:", err);
    }
  }
  next();
});

// Rotte
const forumRoutes = require("./routes/forumRoutes");
app.use("/forum", forumRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const strumenti = require("./routes/strumentiRoutes");
app.use("/strumenti", strumenti);

// Middleware per la gestione degli errori
app.use((err, req, res, next) => {
  console.error(err); // Stampa l'errore in console per il debug
  res.status(500).send("Errore del server");
});

// Timer
app.get("/timer", (req, res) => {
  res.render("strumenti/timer");
});

module.exports = app;
