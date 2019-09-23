const express = require('express');
const router = express.Router();

const User = require('../models/User'); // se llama ala clase del modelo 
const passport = require('passport'); 

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs')
});
  
router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/note',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

  //

router.get('/users/signup',  (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', async  (req, res) => {
    const {name, email, password, confirm_password} =req.body;
    const errors = [];
    console.log(req.body);
    if(name.length <= 0 ){
        errors.push({text: 'Coloque su nombre'});
    }
    if(email.length <= 0 ){
        errors.push({text: 'Coloque su email'});
    }
    if(  password.length < 6 ){
        errors.push({text: ' la contraseña tiene que ser mayor a 6 caracteres'});
    }
    if( password != confirm_password  ){
        errors.push({text: ' las contraseñas no coinsiden'});
    }
    if( errors.length > 0 ) {
        res.render('users/signup.hbs', {errors, name, email, password, confirm_password});
    }else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Este email ya esta en uso');
            res.redirect('/users/signup');
        }
       const newUser = new User({name, email, password});
       newUser.password= await newUser.encryptPassword(password);
       console.log(req.body);
       await newUser.save();
       req.flash('success_msg', 'Usuario Nuevo Registrado exitosamente');
       res.redirect('/users/signin');
    }
  
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
