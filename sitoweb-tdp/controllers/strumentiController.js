const ImcData = require("../models/ImcData");

exports.hub = (req, res) => {
  res.render("strumenti/strumenti", { currentUser: req.user });
};

exports.imcForm = (req, res) => {
  res.render("strumenti/imc", { currentUser: req.user });
};

exports.CKCalForm = (req, res) => {
  res.render("strumenti/CKCal", { currentUser: req.user });
};

exports.timer = (req, res) => {
  res.render("strumenti/timer", { currentUser: req.user });
};

exports.imcSend = async (req, res) => {
  try {
    const { altezza, peso, imc, classificazione } = req.body;

    const imcRecord = await ImcData.create({
      userId: req.session.userId,
      altezza,
      peso,
      imc,
      classificazione,
    });

    res.json({ success: true, data: imcRecord });
  } catch (error) {
    console.error("Errore salvataggio IMC:", error);
    res.status(500).json({ error: "Errore nel salvataggio dei dati" });
  }
};
