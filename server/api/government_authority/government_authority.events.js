/**
 * GovernmentAuthority model events
 */

'use strict';

import {EventEmitter} from 'events';
var GovernmentAuthorityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GovernmentAuthorityEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(GovernmentAuthority) {
  for(var e in events) {
    let event = events[e];
    GovernmentAuthority.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    GovernmentAuthorityEvents.emit(event + ':' + doc._id, doc);
    GovernmentAuthorityEvents.emit(event, doc);
  };
}

export {registerEvents};
export default GovernmentAuthorityEvents;
