'require strict';

const stats = require('./stats');

console.log('Client app is starting...');
run();

const streamUrl = 'http://livestream.0x77.net/hls/stream.m3u8';

const video = document.getElementById('video');
if (Hls.isSupported()) {
  console.log('hls is supported');
  const hls = new Hls();
  hls.loadSource(streamUrl);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function() {
    console.log('manifest parsed!');
    console.log(video);
  });
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
  // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
  // This is using the built-in support of the plain video element, without using hls.js.
  // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
  // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
  video.src = streamUrl;
  video.addEventListener('loadedmetadata', function() {
    console.log('loadedmetadata complete')
    video.play();
  });
}


async function checkStreams(){
  const streams = await stats.listStreams();
  console.log("We have these streams: " + streams);
  const video = document.getElementById('video');
  if(streams.length > 0) {
    video.style.display = 'inline';
  }
  else {
    video.style.display = 'none';
  }
}

async function run(){
    await checkStreams();
    setInterval(checkStreams, 2000);
}
