const mongoose = require('mongoose');
const {Schema} = mongoose;

const sufragioSchema =  new Schema({
    voto: {type: String, required: true},
    dni:{type:Number, required: true},
    ciudad:{type: String, required: true},
    date:{type: Date},
    candidato: { type: Schema.Types.ObjectId, ref: "Candidato" } 
     
}, {timestamps:true})



module.exports = mongoose.model('Sufragio', sufragioSchema);