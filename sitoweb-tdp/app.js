const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const User = require("./models/User");

const app = express();

// Connessione al database
require("./config/database");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "x9&f$3jsl!z@8PLm1#Qw7Jc$Loe21GhBp",
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware per l'utente corrente
app.use(async (req, res, next) => {
  res.locals.currentUser = null;
  req.user = null;
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select(
        "username _id"
      );
      if (user) {
        req.user = user;
        res.locals.currentUser = user;
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

const strumentiRoutes = require("./routes/strumentiRoutes");
app.use("/strumenti", strumentiRoutes);

const approfondimentiRoutes = require("./routes/approfondimentiRoutes");
app.use("/approfondimenti", approfondimentiRoutes);

const articoliRoutes = require("./routes/articoliRoutes");
app.use("/articoli", articoliRoutes);

const contattiRoutes = require("./routes/contattiRoutes");
app.use("/contatti", contattiRoutes);

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// Middleware per la gestione degli errori
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Errore del server");
});

module.exports = app;
