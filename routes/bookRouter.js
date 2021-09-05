/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controllers/booksController');


function routes(Book){
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
  
      book.save();
      res.status(201).json(book);
    })
    .get(controller.get);
  // Find single item
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if(err) {
          return res.send(err);
        } 
        return res.json(book);
      });
    })  
    .put((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
          if(err) {
            return res.send(err);
          } 
          book.title = req.body.title;
          book.author = req.body.author;
          book.genre = req.body.genre;
          book.read = req.body.read;
          book.save();
          return res.json(book);
        });
    })    
    return bookRouter;
}

module.exports = routes;
