const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
methodeOverride = require('method-override'),
pug = require('pug');

var db = require('.models');

var app = express();

var blogRouter = require('./routes/blogs');

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverrride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }})
);

app.get('/',(request, response) => {
  response.redirect('/blogs');
});

db.sequelizesync().then(() => {
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
