const express = require('express');
const router = express.Router();

const Sufragio = require('../models/Votos'); // se llama ala clase del modelo 
const Candidato = require('../models/Candidatos')
//const passport = require('passport'); 

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs')
});
  

// router.post('/users/signin', passport.authenticate('local',{
//     successRedirect: '/note',
//     failureRedirect: '/users/signin',
//     failureFlash: true
// }));

// router.post('/users/signin', passport.authenticate('local',{
//     successRedirect: '/votaciones',
//     failureRedirect: '/users/signin',
//     failureFlash: true
// }));


  //

router.get('/users/signup/:idCandidato', async (req, res) => {
  
    const idCandidato = req.params.idCandidato;

    Candidato.findById(idCandidato, (err, mivoto) => {
      if (err)
        return res.status(500).send({ message: `Hobo un error =>  ${err}` });
      if (!mivoto)
        return res.status(404).send({
          message: `Hobo un error, el mivoto con este ID: ${err}  no exsite `,
        });
  
     // res.status(200).send({ mivoto });
      console.log({ mivoto });
      res.render('users/signup.ejs', {mivoto});
    });
    
    
});

router.post('/users/signup/:idCandidato', async  (req, res) => {
              
                const {voto, dni, ciudad} =req.body;
                const idCandidato = req.params._id;
               // const errors = [];
              if(voto.length <= 0 ){
                 // errors.push({text: 'campo candidato vacio'});
                 console.log('voto vacioooo');
               //  await  res.render('/users/signup/:idCandidato');
              }
              if(dni.length < 8 || dni.length > 8 ){
                console.log('numero de digitos es mayor o menor al lo esperado')
                res.redirect(`/`);
              //  res.render('/users/signup/:idCandidato');
                //  errors.push({text: ' Solo se admite los 8 digitos del Documento de Identidad'});
              }if(ciudad.length <= 0 ){
                res.redirect(`/`);
               // errors.push({text: 'Coloque la ciudad desde donde Vota'});
               console.log('CAMPO CIUDAD VACIO');
              // await res.render('/users/signup/:idCandidato');
              }else{
                  const dniYaVoto = await Sufragio.findOne({dni: dni});
                  if(dniYaVoto){
                    //  req.flash('error_msg', 'Ud YA REALIZO SU VOTO ');
                      console.log('Ud ya VOTOOOO');
                      console.log("entro al if..!!!");
                      res.redirect(`/`);
                  }else{
                    const new_voto = new Sufragio(req.body);
                    // const micandidato = await Candidato.findById(idCandidato);
                      const micandidato =  await Candidato.findOne({ _id: `${idCandidato}` }).exec();
                      new_voto.candidato = micandidato; // agregando el post al usuario espicificado con el userId
                      await new_voto.save();
                      micandidato.votos.push(new_voto); // agregando el post al array del Modelo User
                      // guardar el usuario con su post nuevo
                      await micandidato.save(); // guardando user
                      console.log('==> user2: '+ micandidato + 'TERMINO LA CONSULTA DE REQ.BODY');
                    // res.status(200).send(new_voto);
                      res.redirect('/results');
                  }
                
            }
                   
              
  
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
