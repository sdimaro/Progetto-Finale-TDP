exports.renderApprofondimenti = (req, res) => {
  try {
    const hash = req.url.split("#")[1];
    const tabMapping = {
      nutrition: "nutrition",
      mindfulness: "mindfulness",
      movement: "movement",
    };
    const activeTab = tabMapping[hash] || null;

    res.render("approfondimenti/approfondimenti", {
      activeTab: activeTab,
    });
  } catch (err) {
    console.error("Errore nel render:", err);
    res.status(500).send("Errore nel caricamento della pagina");
  }
};
