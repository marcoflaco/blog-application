const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      logger = require('morgan');

var db = require('./models');

var app = express();

var adminRouter = require('./routes/blogs');

app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/blogs', blogsRouter);

app.get('/', (req, res) => {
db.Post.findAll().then((blogPosts) => {
    res.render('index', { blogPosts: blogPosts });
  });
});

app.get('/:slug', (req, res) => {
  db.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((post) => {
    res.render('posts/show', { post: post });
  }).catch((error) => {
    res.status(404).end();
  });
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
