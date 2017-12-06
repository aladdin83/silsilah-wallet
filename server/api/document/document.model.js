'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './document.events';

var DocumentSchema = new mongoose.Schema({
  title: String,
  description: String,
  data: Object,
  wallet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet'
  },
  assetData: {
    type: Object
  },
  info: String,
  active: Boolean,
  created: Date,
});

registerEvents(DocumentSchema);
export default mongoose.model('Document', DocumentSchema);
