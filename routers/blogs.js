const express = require('express'),
      Sequelize = require('sequelize'),
      router = express.Router();

const sequelize = new Sequelize('marcocampos', 'marcocampos', '', { dialect: 'postgres' });

// Our model definition:
var Blog = sequelize.define('book', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  author: Sequelize.STRING,
  description: Sequelize.TEXT
});
// ======================

router.get('/', (request, response) => {
  Blog.findAll({ order: 'id ASC' }).then((blogs) => {
    response.render('blogs/index', { blogs: blogs });
  });
});

router.post('/', (request, response) => {
  if (request.body.title) {
    Blog.create(request.body).then(() => {
      response.redirect('/blogs');
    });
  } else {
    response.redirect('/blogs/new');
  }
});

router.get('/new', (request, response) => {
  response.render('blogs/new');
});

router.get('/:id', (request, response) => {
  Book.findById(request.params.id).then((blog) => {
    response.render('books/show', { blog: blog });
  });
});

router.get('/:id/edit', (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    response.render('blogs/edit', { blog: blog });
  });
});

router.delete('/:id', (request, response) => {
  Blog.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/blogs');
  });
});

router.put('/:id', (request, response) => {
  Blog.update(request.params, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/blogs/' + request.params.id);
  });
});

module.exports = router;
