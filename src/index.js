const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Initialization

const app = express();
require('./database');
require('./config/passport');

// Settings


//
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('views engine', '.hbs', '.ejs');

// Middlewares

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());//siempre despues de session para que guarde la session
app.use(passport.session());
app.use(flash());// despues de passport para que guarde los mensages

//Global Variables

app.use(( req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use(require('./routes/votacion'));
app.use(require('./routes/candidatos'));
//Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});