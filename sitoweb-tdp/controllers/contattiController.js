exports.showContatti = (req, res) => {
  res.render("contatti/contatti", {
    currentUser: req.user,
    pageTitle: "Contattaci",
    showSuccessBanner: false, // Default non mostra il banner
  });
};

exports.handleContactForm = (req, res) => {
  res.render("contatti/contatti", {
    currentUser: req.user,
    pageTitle: "Contattaci",
    showSuccessBanner: true, // Mostra il banner
  });
};
