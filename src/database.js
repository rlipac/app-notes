
 
//     mongoose.connect('mongodb+srv://richard:mariabelen1302@cluster0-pagkr.mongodb.net/test?retryWrites=true&w=majority', {   
//     useCreateIndex: true,
//     useNewUrlParser: true,
//      useUnifiedTopology: true,
//     useFindAndModify: false
// })
//     .then( db => console.log('DB is Connected...exito!!!'))
//     .catch( err => console.error(err));
const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/votaciones2020', {   
    useCreateIndex: true,
    useNewUrlParser: true,
     useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( db => console.log('DB is Connected...exito!!!'))
    .catch( err => console.error(err));


  