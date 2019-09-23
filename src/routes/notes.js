const express = require('express');
const router = express.Router();

// Requiriendo el modelo

const Note = require('../models/Note'); // se llama ala clase del modelo que crea la bs de datos en mongo
const { isAuthenticated } = require('../helpers/auth');

router.get('/note/add', isAuthenticated,  (req, res) => {
    res.render('note/new-note.hbs');
});

router.post('/note/new-note', isAuthenticated, async (req, res) => {
 const { title, description } =  req.body;
 const errors = [];
 if(!title){
     errors.push({ text: 'Falta el titulo' });

 }
 if(!description){
    errors.push( { text: 'Falta descripcion' } );
 }
 if(errors.length > 0) {
     res.render('note/new-note.hbs', {
         errors,
         title,
         description
     });
 } else{
    const newNote =   new Note({ title, description });
    newNote.user = req.user.id; // enlasa la nota del usuario con el usuario
   await newNote.save();
   req.flash('success_msg', 'Nota agregada en forma correcta');
   res.redirect('/note');
 }
    
});


router.get('/note', isAuthenticated, async (req, res) => { // consulta y lista los datos de la collection db
   
    const notes = await  Note.find({ user: req.user.id }).sort({date: 'desc'});
    res.render('note/all-notes.hbs', { notes }); 
});
router.get('/note/edit/:id', isAuthenticated, async (req, res) => { // consulta y lista los datos para hacer el update haciendo referencia al id
    const note = await Note.findById(req.params.id);
    res.render('note/edit-note.hbs', { note }); 
});

router.put('/note/edit-note/:id', isAuthenticated, async(req, res) =>{
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    console.log(req.params.id);
    res.redirect('/note');
});
router.delete('/note/delete/:id', isAuthenticated, async(req, res) =>{
    await Note.findByIdAndDelete(req.params.id); 
    res.redirect('/note');
});





module.exports = router;