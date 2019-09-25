const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema =  new Schema({ // crea el modelo  del la tabla User
    //name : { type: String, required: true },
    presidente: {type: String, required: true},
    email : { type: String, required: true },
    password : { type: String, required: true },
    date : { type: Date, default: Date.now },
   
});

// encruptamos lñas contraseñas // async -> await para que ejecute en forma asincrona
UserSchema.methods.encryptPassword = async (password) => {
 const salt= await bcrypt.genSalt(10);
 const hash = bcrypt.hash(password, salt); // le pasamos la contraseña y el sal para obtener el hash
  return hash;  
};

// este metodo compara las contraseeña que ingresa el usuario para loguearse con la contraseña encryptada
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password); // le pasamos el metoro compare de bcrypt y como parametro la contraseña actual y la cotraseña guardada en el Modelo
}

module.exports = mongoose.model('User', UserSchema);