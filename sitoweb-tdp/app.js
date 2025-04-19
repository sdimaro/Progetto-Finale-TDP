const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Rotte
const healthRoutes = require("./routes/userRoutes");
app.use("/health", healthRoutes);


//timer
app.get('/timer', (req, res) => {
    res.render('strumenti/timer');
});

module.exports = app;
