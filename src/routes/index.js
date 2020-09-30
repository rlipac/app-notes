const express = require('express');
const router = express.Router();

// router.get('/users/signup', (req, res) => {
//     res.render('users/signup.hbs');
// });
const Candidato = require('../models/Candidatos');

router.get('/', (req, res) => {
    Candidato.find({}, (err, candidatos) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Hobo un error al realizar la peticion ${err}` });
        if (!candidatos)
          return res.status(404).send({ message: `collecion vacia o no existe ` });
    
       // res.status(200).send({ candidatos });
        console.log({ candidatos });
        res.render('index.ejs', {candidatos});
      });
    
});


router.get('/about', (req, res) => {
    res.render('about.hbs');
});

module.exports = router;