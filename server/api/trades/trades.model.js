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

export default mongoose.model('Trades', TradesSchema);
