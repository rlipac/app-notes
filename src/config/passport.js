const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const Sufragio = require('../models/Votos');


passport.use(new LocalStrategy({
    votoField: 'dni'
}, async (dni, passport, done) =>{
    const dniVoto = await Sufragio.findOne({dni: dni});
    if(!dniVoto){
        console.log('dni de usuario no existe no existe');
        return done(null, false, { message: 'DNI de Usuario No existe.'});
    } else {
        const match = await dniVoto.matchPassword(passport);
        if(match){
            return done(null, dniVoto);
        } else {
            console.log('DNI invalido');
            return done(null, false, {message: 'DNI incorrecto'});
        }
    }
}
));

passport.serializeUser((dniVoto, done) => {
    done(null, dniVoto.id);
});

passport.deserializeUser((id, done) =>{
    Sufragio.findById(id, (err, dniVoto)=>{
        done(err, dniVoto);
    });
});