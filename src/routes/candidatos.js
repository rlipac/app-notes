const express = require('express');
const router = express.Router();

const  Candidato = require('../models/Candidatos'); // se llama ala clase del modelo 
//const passport = require('passport'); 


router.post('/candidatos/add', async (req, res) => {
  const { name, urlFoto, info, urlInfo, estado  } = req.body; // guarda los datos del body
   console.log(req.body);
   const candidato = new Candidato({
     name,
     urlFoto,
     info,
     urlInfo,
     estado
   }); // añade al objeto userSchema
   await candidato.save((err, candidatoStored) => {
     // Guarda e n la base de datos
     if (err)
       res.status(500).send({
         message: `Hobo un error al guardatos en la collecion MongoDB ${err}`,
       });
     //res.status(200).send({ candidato: candidatoStored });
     console.log({candidatoStored});
    res.redirect('/');
   });
});

module.exports = router;