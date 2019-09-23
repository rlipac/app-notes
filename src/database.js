const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
     useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( db => console.log('DB is Connected'))
    .catch( err => console.error(err));