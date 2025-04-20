const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Form per il login
exports.loginForm = (req, res) => {
  res.render("auth/login");
};

// Login dell'utente  (aggiunto controllo password)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Credenziali errate");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Credenziali errate");
    }

    req.session.userId = user._id;
    console.log("Login effettuato, userId in sessione:", req.session.userId);
    res.redirect("/forum");
  } catch (err) {
    console.error("Errore login:", err);
    res.status(500).send("Errore durante il login");
  }
};

// Form per la registrazione
exports.registerForm = (req, res) => {
  res.render("auth/register");
};

// Registrazione dell'utente
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash della password con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Memorizza l'ID dell'utente nella sessione
    req.session.userId = user._id; // Salviamo l'ID utente nella sessione
    res.redirect("/forum");
  } catch (err) {
    res.status(500).send("Errore durante la registrazione");
  }
};

// Logout dell'utente
exports.logout = (req, res) => {
  // Rimuovi l'ID dell'utente dalla sessione
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Errore nel logout");
    }
    res.redirect("/login");
  });
};
