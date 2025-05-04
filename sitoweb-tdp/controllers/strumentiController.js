exports.hub = (req, res) => {
    res.render("strumenti/strumenti");
}

exports.imcForm = (req, res) => {
    res.render("strumenti/imc");
}

exports.CKCalForm = (req, res) => {
    res.render("strumenti/CKCal");
}

exports.timer = (req, res) => {
    res.render("strumenti/timer");
}