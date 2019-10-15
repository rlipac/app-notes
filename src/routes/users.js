const express = require('express');
const router = express.Router();

const User = require('../models/User'); // se llama ala clase del modelo 
const passport = require('passport'); 

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs')
});
  

// router.post('/users/signin', passport.authenticate('local',{
//     successRedirect: '/note',
//     failureRedirect: '/users/signin',
//     failureFlash: true
// }));

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/votaciones',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


  //

router.get('/users/signup',  (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', async  (req, res) => {
   // const {name, email, password, confirm_password} =req.body;
   var {presidente, email, password} =req.body;
    const errors = [];
    console.log(req.body);
    if(email.length <= 0 ){
        errors.push({text: 'Coloque su email'});
    }
    if(  password.length < 8 ){
        errors.push({text: ' la contraseña tiene que ser mayor a 8 caracteres'});
    }
    if( errors.length > 0 ) {
        res.render('users/signup.hbs', {errors, presidente, email, password});
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Ud YA REALIZO SU VOTO ');
            res.redirect('/users/signup');
            console.log("entro al if..!!!");
        }else{
            const newUser = new User({presidente, email, password});
            newUser.password= await newUser.encryptPassword(password);
            console.log(req.body);
            await newUser.save();
            req.flash('success_msg', 'Usuario Nuevo Registrado exitosamente');
            res.redirect('/');
            console.log("se guardo usuario");
        }
      
    }
  
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
