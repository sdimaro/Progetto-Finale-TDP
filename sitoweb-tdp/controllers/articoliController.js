exports.elencoArticoli = (req, res) => {
    res.render("articoli/articoli", { 
        currentUser: req.user,
    });
};

exports.superfoodsMediterranei = (req, res) => {
    res.render("articoli/superfoods-mediterranei", {
        currentUser: req.user,
    });
};

exports.meditazionePrincipianti = (req, res) => {
    res.render("articoli/meditazione-principianti", {
        currentUser: req.user,
    });
};

exports.eserciziCorpoLibero = (req, res) => {
    res.render("articoli/esercizi-corpo-libero", {
        currentUser: req.user,
    });
};