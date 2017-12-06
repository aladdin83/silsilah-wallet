/**
 * Document model events
 */

'use strict';

import {EventEmitter} from 'events';
var DocumentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DocumentEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Document) {
  for(var e in events) {
    let event = events[e];
    Document.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DocumentEvents.emit('${event}: ${doc._id}', doc);
    DocumentEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DocumentEvents;
