const express = require('express');
const router = express.Router();





// Requiriendo el modelo

const Note = require('../models/User'); // se llama ala clase del modelo que crea la bs de datos en mongo
const { isAuthenticated } = require('../helpers/auth');

router.get('/votaciones', isAuthenticated, async (req, res) => { // consulta y lista los datos de la collection db
   
  //  const votos = await  User.find({ user: req.user.id }).sort({date: 'desc'});
    const votos = db.collection('users').find({ presidente: 'Julio Guzman' });
    res.render('votaciones/votacion.hbs', {votos}); 
});









module.exports = router;