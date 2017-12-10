'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './government_authority.events';

var GovernmentAuthoritySchema = new mongoose.Schema({
  name: String,
  info: String,
  digitalSigniturePk: String,
  digitalSignitireSk: String,
  LogoFileName: String,
  active: Boolean
});

registerEvents(GovernmentAuthoritySchema);
export default mongoose.model('GovernmentAuthority', GovernmentAuthoritySchema);
