const User = require("../models/User");
const ImcData = require("../models/ImcData");
const crypto = require("crypto");

// Form per il login
exports.loginForm = (req, res) => {
  res.render("auth/login");
};

// Login dell'utente
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Password inserita (login):", password); // Log della password inserita nel login

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Utente non iscritto");
    }

    console.log("Utente trovato:", user.username); // Log dell'utente trovato nel database

    console.log("Tipo password (login):", typeof password, "valore:", password);
    console.log(
      "Tipo password utente (database):",
      typeof user.password,
      "valore:",
      user.password
    );

    // Hash della password inserita con SHA-256
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    console.log("Hash della password inserita (SHA-256):", hashedPassword); // Log dell'hash della password

    // Confronto della password hashata con quella salvata nel database
    if (hashedPassword !== user.password) {
      return res.status(400).send("Password errata");
    }

    req.session.userId = user._id;
    console.log("Login effettuato, userId in sessione:", req.session.userId);
    res.redirect("/");
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

    console.log("Pass prima del hash (registrazione):", password); // Log della password prima dell'hash
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    console.log("Hash della password (registrazione):", hashedPassword); // Log dell'hash generato

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Verifica subito dopo la registrazione
    const checkHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    console.log(
      "Confronto hash subito dopo la registrazione:",
      checkHash === user.password
    ); // Confronto dell'hash subito dopo la registrazione

    req.session.userId = user._id;
    res.redirect("/");
  } catch (err) {
    console.error("Errore durante la registrazione:", err);
    res.status(500).send("Errore durante la registrazione");
  }
};

// Logout dell'utente
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Errore nel logout");
    }
    res.redirect("/");
  });
};

// Connessione con API quickchart per grafico profilo
exports.showProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).lean();
    const imcRecords = await ImcData.find({ userId })
      .sort({ createdAt: 1 })
      .lean();

    let chartUrl = null;

    if (imcRecords.length > 0) {
      const labels = imcRecords.map((d) =>
        new Date(d.createdAt).toLocaleDateString()
      );
      const data = imcRecords.map((d) => d.imc);

      const chartConfig = {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "IMC nel tempo",
              data,
              borderColor: "green",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    }

    res.render("user/profilo", { user, imcRecords, chartUrl });
  } catch (err) {
    console.error("Errore nel caricamento del profilo:", err);
    res.status(500).send("Errore nel caricamento del profilo");
  }
};
