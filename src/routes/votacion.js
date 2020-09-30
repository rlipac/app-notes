const express = require('express');
const router = express.Router();

// Requiriendo el modelo
const Sufragio = require('../models/Votos') ;
const Candidato = require('../models/Candidatos')



router.get('/candidatos/add', (req, res) => {  
    res.render('votaciones/new-candidato.hbs');
});

//router.post('/note/new-note', isAuthenticated, async (req, res) => {})


// router.post('/candidatos/add', async (req, res) => {
//    const { name, urlFoto, info, urlInfo, estado  } = req.body; // guarda los datos del body
//    console.log(req.body);
//    const candidato = new Candidato({
//      name,
//      urlFoto,
//      info,
//      urlInfo,
//      estado
//    }); // añade al objeto userSchema
//    await candidato.save((err, candidatoStored) => {
//      // Guarda e n la base de datos
//      if (err)
//        res.status(500).send({
//          message: `Hobo un error al guardatos en la collecion MongoDB ${err}`,
//        });
//      //res.status(200).send({ candidato: candidatoStored });
//      console.log({candidatoStored});
//      res.redirect('/');
//    });
// });


router.get('/results',  async (req, res) => { // consulta y lista los datos de la collection db

await  Candidato.find({}, (err, candidatos) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Hobo un error al realizar la peticion ${err}` });
    if (!candidatos)
      return res.status(404).send({ message: `collecion vacia o no existe ` });

   // res.status(200).send({ candidatos });
    console.log({ candidatos });
    res.render('votaciones/results.ejs', {candidatos});
  });

 const nvotos =  await Sufragio.find({}).countDocuments();
 console.log(nvotos);

});









module.exports = router;