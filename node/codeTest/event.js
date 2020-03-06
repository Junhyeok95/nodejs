const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('e1', () => {
    console.log('e1');
});

myEvent.emit('e1');

myEvent.on('e2', () => {
    console.log('e2');
});

myEvent.emit('e2');