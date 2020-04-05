'require strict';

const stats = require('./stats');

console.log('Client app is starting...');

async function run(){
    const streams = await stats.listStreams();
    console.log("We have these streams: " + streams);
}
