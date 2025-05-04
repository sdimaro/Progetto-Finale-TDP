module.exports = {
    // Middleware per verificare se l'utente è autenticato
    isAuthenticated: (req, res, next) => {
        if (req.session.userId) {
            return next();
        }
        res.status(401).json({ error: 'Non autorizzato' });
    },

    // Middleware per aggiungere lo stato di autenticazione alle views
    addAuthStatus: (req, res, next) => {
        res.locals.isLoggedIn = !!req.session.userId;
        res.locals.currentUser = req.session.userId ? {
            _id: req.session.userId,
            username: req.session.username
        } : null;
        next();
    }
};