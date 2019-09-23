const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){// si esta autenticado que siga adelante
        return next();
    }
    req.flash('error_msg', 'Ud no esta autorizado');
    res.render('users/signin.hbs');
}


module.exports = helpers;