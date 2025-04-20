const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Form per il login
exports.loginForm = (req, res) => {
  res.render("auth/login");
};

// Login dell'utente
exports.login = async (req, res) => {
  try {
    const { username } = req.body; // Usa solo username dal form
    const user = await User.findOne({ username }); // Cerca l'utente usando username

    if (!user) {
      return res.status(400).send("Credenziali errate");
    }

    // Memorizza l'ID dell'utente nella sessione
    req.session.userId = user._id; // Salviamo l'ID utente nella sessione
    console.log("ID utente salvato nella sessione:", req.session.userId);

    // Reindirizza l'utente al forum
    res.redirect("/forum");
  } catch (err) {
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
