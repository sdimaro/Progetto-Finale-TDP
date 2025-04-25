const Newsletter = require("../models/Newsletter");
const axios = require("axios"); // Se non l'hai già installato, usa `npm install axios`

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.render("home", {
        success: null,
        error: "Sei già iscritto alla newsletter",
      });
    }

    // Salva comunque l'email nel database
    await Newsletter.create({ email });

    // Invia l'email solo se l'email termina con 'itis.pr.it'
    if (email.endsWith("@itis.pr.it")) {
      const response = await axios.post(
        "https://api.resend.com/emails",
        {
          from: "onboarding@resend.dev", // Email di mittente
          to: email, // Email del destinatario
          subject: "Benvenuto alla Newsletter!",
          html: `
            <h2>Grazie per esserti iscritto 🌿</h2>
            <p>Riceverai presto contenuti esclusivi, consigli sul benessere e ricette sane.</p>
            <p>Continua a seguirci sul nostro <a href="http://localhost:3000">sito</a>.</p>
          `,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`, // La tua API key Resend
          },
        }
      );

      // Verifica se l'email è stata inviata correttamente
      if (response.status === 200) {
        res.render("home", {
          success: "Grazie! Iscrizione alla newsletter avvenuta con successo.",
          error: null,
        });
      } else {
        res.render("home", {
          success: null,
          error:
            "Si è verificato un errore durante l'invio dell'email di benvenuto.",
        });
      }
    } else {
      res.render("home", {
        success: "Grazie per esserti iscritto!",
        error: null,
      });
    }
  } catch (err) {
    console.error("Errore iscrizione newsletter:", err);
    res.render("home", {
      error: "Si è verificato un errore durante l'iscrizione.",
      success: null,
    });
  }
};
