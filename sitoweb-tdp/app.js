const express = require("express");
require("./config/database");

const path = require("path");
const session = require("express-session");
const app = express();

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

// Rotte
const forumRoutes = require("./routes/forumRoutes");
app.use("/forum", forumRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

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
