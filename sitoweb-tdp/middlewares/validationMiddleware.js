exports.validateIMCData = (req, res, next) => {
    const { altezza, peso } = req.body;
    
    if (!altezza || !peso) {
        return res.status(400).json({ error: 'Altezza e peso sono richiesti' });
    }
    
    if (isNaN(altezza) || isNaN(peso)) {
        return res.status(400).json({ error: 'Altezza e peso devono essere numeri' });
    }
    
    next();
};

exports.validateCalorieData = (req, res, next) => {
    const { sesso, eta, peso, altezza, attivita, obiettivo } = req.body;
    
    const errorMessages = [];
    if (!sesso) errorMessages.push('Sesso richiesto');
    if (!eta || isNaN(eta)) errorMessages.push('Età deve essere un numero');
    // Aggiungi altre validazioni...
    
    if (errorMessages.length > 0) {
        return res.status(400).json({ errors: errorMessages });
    }
    
    next();
};