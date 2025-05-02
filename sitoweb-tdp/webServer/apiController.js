class ApiController {
    // Calcolo IMC
    static calcolaIMC(req, res) {
        const { altezza, peso } = req.body;
        
        if (!altezza || !peso) {
            return res.status(400).json({ error: 'Altezza e peso sono richiesti' });
        }

        const altezzaInMetri = altezza / 100;
        const imc = (peso / (altezzaInMetri * altezzaInMetri)).toFixed(1);

        let classificazione, rischio;
        if (imc < 18.5) {
            classificazione = 'Sottopeso';
            rischio = 'Moderato';
        } else if (imc < 25) {
            classificazione = 'Normopeso';
            rischio = 'Basso';
        } else if (imc < 30) {
            classificazione = 'Sovrappeso';
            rischio = 'Moderato';
        } else {
            classificazione = 'Obeso';
            rischio = 'Alto';
        }

        res.json({
            imc,
            classificazione,
            rischio,
            interpretazione: `Il tuo IMC è ${imc} (${classificazione}). Rischio per la salute: ${rischio}.`
        });
    }

    // Calcolo Fabbisogno Calorico (Formula di Mifflin-St Jeor)
    static calcolaCalorie(req, res) {
        const { sesso, eta, peso, altezza, attivita, obiettivo } = req.body;
        
        if (!sesso || !eta || !peso || !altezza || !attivita || !obiettivo) {
            return res.status(400).json({ 
                error: 'Tutti i campi sono richiesti: sesso, eta, peso, altezza, attivita, obiettivo' 
            });
        }

        // Calcolo metabolismo basale
        let metabolismoBasale;
        if (sesso.toLowerCase() === 'maschio') {
            metabolismoBasale = 10 * peso + 6.25 * altezza - 5 * eta + 5;
        } else {
            metabolismoBasale = 10 * peso + 6.25 * altezza - 5 * eta - 161;
        }

        // Calcolo fabbisogno calorico giornaliero
        const fabbisogno = metabolismoBasale * attivita + parseInt(obiettivo);

        res.json({
            metabolismoBasale: metabolismoBasale.toFixed(0),
            fabbisognoCalorico: fabbisogno.toFixed(0),
            interpretazione: `Il tuo fabbisogno calorico giornaliero è di circa ${fabbisogno.toFixed(0)} kcal.`
        });
    }
}

module.exports = ApiController;