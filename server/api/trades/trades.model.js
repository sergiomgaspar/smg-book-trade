'use strict';

import mongoose from 'mongoose';

var TradesSchema = new mongoose.Schema({
  status: Number,
  bookId: String,
  ownerId: String,
  ownerName: String,
  insertDate: String,
  requesterId: String,
  requesterName: String
});

/* Search Books by ID of owner */
TradesSchema.methods.findByOwnerId = function(cb) {  
  return this.model('Trades').find({ ownerId: this.ownerId, status: 0 }, cb);
};

/* Search Books by ID of Requester */
TradesSchema.methods.findByRequesterId = function(cb) {  
  return this.model('Trades').find({ requesterId: this.requesterId, status: 0 }, cb);
};

export default mongoose.model('Trades', TradesSchema);
