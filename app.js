const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const environment = require('./config/environment');
const router = require('./config/routes');
const auth = require('./lib/auth');


const app = express();
const port = environment.port;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

mongoose.connect(environment.dbUri);

app.use(session({
  secret: 'sshhh..',
  resave: false,
  saveUninitialized: false
}));



app.use('*', auth.checkAuthStatus);
app.use(router);


app.listen(port, () => console.log('Express is listening on port 4000'));
