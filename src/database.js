

    const mongoose = require('mongoose');
 // mongoose.connect('mongodb+srv://richard:mariabelen@cluster  
    mongoose.connect('mongodb://localhost/new-voto', {   
    useCreateIndex: true,
    useNewUrlParser: true,
     useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( db => console.log('DB is Connected...exito!!!'))
    .catch( err => console.error(err));


  