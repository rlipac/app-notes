const mongoose = require('mongoose');
const {Schema} = mongoose;

const candidatoSchema =  new Schema({ // crea el modelo  del la tabla User
    name: { type: String, required: true },
    urlFoto:{type: String, required: true},
    info:{type: String},
    urlInfo:{type: String}, 
    estado:{type: Boolean, required: true},  
    votos:
    [
      {
          type: Schema.Types.ObjectId,
          ref:'Sufragio'
      }  
    ] 
    
});

module.exports= mongoose.model('Candidato', candidatoSchema);


