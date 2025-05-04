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