'require strict';

const stats = require('./stats');

console.log('Client app is starting...');
run();

const streamUrl = 'http://livestream.0x77.net/hls/stream.m3u8';

const player = videojs('video', {
  responsive: true,
  fill: true,
  html: {
    hls: {
      overrideNative: !videojs.browser.IS_ANY_SAFARI
    }
  }
});
player.src({
  src: streamUrl
});
// player.play();

async function checkStreams(){
  const streams = await stats.listStreams();
  console.log("We have these streams: " + JSON.stringify(streams));
  const video = document.getElementById('video');
  if(streams.length > 0) {
    //video.style.display = 'inline';
  }
  else {
    //video.style.display = 'none';
  }
}

async function run(){
    await checkStreams();
    setInterval(checkStreams, 2000);
}
