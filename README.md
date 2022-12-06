# livestream

My (reusable) tools for setting up a livestream site, built 
around [owncast](https://github.com/owncast/owncast).

# about

In early 2020 I conducted some experiments around live streaming 
video and audio to the web using nginx and `mod-rtmp`. It worked, and
I did some live synth streaming sessions for a few friends.

But it wasn't easy to set up and the client was a bit fragile/bespoke, and
not something I ever wanted to maintain long term. In early 2023, 
I intend to attempt some streaming again, but this time leveraging 
[owncast](https://github.com/owncast/owncast) because I've used it 
happily for some other streaming for about 2 years.

I've decided to keep this repo and its history, but to stomp
over it all with the new stuff.

# how it will work

* use terraform to spin up a temporary streaming instance
* provision software on that instance
* install and configure owncast (via docker probably)
* firewall owncast to only talk to reverse proxy
* configure reverse proxy (nginx) to talk to new backend
* stream via obs or ffmpeg

Lots to do!

# todo

this is a historical 

# notes

Some misc/unsorted notes about streaming concerns.

```
ffmpeg -re -f video4linux2 -i /dev/video0 -vcodec libx264 -vprofile baseline -pix_fmt yuv420p -acodec aac -strict -2 -f flv rtmp://livestream.0x77.net/live/stream
```

or to send a video file:
```
ffmpeg -re -i /home/video/somefile.mkv -c:v libx264 -c:a aac -ar 44100 -ac 2 -f flv rtmp://livestream.0x77.net/live/stream
```

http://livestream.0x77.net/

