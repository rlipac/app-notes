const express = require('express');
const router = express.Router();

// Requiriendo el modelo

const Note = require('../models/User'); // se llama ala clase del modelo que crea la bs de datos en mongo
const { isAuthenticated } = require('../helpers/auth');

router.get('/votaciones', isAuthenticated, async (req, res) => { // consulta y lista los datos de la collection db
   
  const votos = db.users.find();
   //const votos  = db.collection('User').find({});
    res.render('votaciones/votacion.hbs', {votos}); 
    console.log(votos);
});









module.exports = router;