'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './wallet.events';

var WalletSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
  },
  name: String,
  info: String,
  active: Boolean,
  created: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String
  }
});

registerEvents(WalletSchema);
export default mongoose.model('Wallet', WalletSchema);
