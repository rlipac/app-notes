const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const User = require('../models/User');


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, passport, done) =>{
    const user = await User.findOne({email: email});
    if(!user){
        console.log('correo no existe');
        return done(null, false, { message: 'Usuario No existe.'});
    } else {
        const match = await user.matchPassword(passport);
        if(match){
            return done(null, user);
        } else {
            console.log('contraseña invalida');
            return done(null, false, {message: 'Password incorrecto'});
        }
    }
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});