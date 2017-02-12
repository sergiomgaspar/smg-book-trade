'use strict';

import mongoose from 'mongoose';

var BooksSchema = new mongoose.Schema({
  ownerId: String,
  ownerName: String,
  title: String,
  authors: [],
  publishedDate: String,
  description: String,
  descriptionFull: String,
  categories: [],
  averageRating: Number,
  thumbnail: String
});

/* Search Books by ID of owner */
BooksSchema.methods.findByUser = function(cb) {  
  return this.model('Books').find({ ownerId: this.ownerId }, cb);
};

export default mongoose.model('Books', BooksSchema);
 