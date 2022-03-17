import mitt from 'mitt';
export const bus = {};
const emitter = mitt();
bus.on = emitter.on;
bus.off = emitter.off;
bus.emit = emitter.emit;
