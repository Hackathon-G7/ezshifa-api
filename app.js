const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost:27017/bookAPI');
const bookRouter = express.Router();
const port = process.env.port || 3000;
const Book = require('./models/bookModel');

// Provide urlencoded and json parser in req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if(req.query.genre){
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if(err) {
        return res.send(err);
      } 
      return res.json(books);
    });
  });
// Find single item
  bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if(err) {
        return res.send(err);
      } 
      return res.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
