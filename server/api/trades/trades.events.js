/**
 * Trades model events
 */

'use strict';

import {EventEmitter} from 'events';
import Trades from './trades.model';
var TradesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TradesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Trades.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TradesEvents.emit(event + ':' + doc._id, doc);
    TradesEvents.emit(event, doc);
  };
}

export default TradesEvents;
