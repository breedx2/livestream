# livestream

Tools/setup around DIY livestream nginx thing.

# about

NGINX has a module called `mod-rtmp` which can be used to receive RTMP
streams from clients.  If you combine this with HLS and a bit of client
side javascript in a modern browser, you can implement a pretty simple
streaming server.  This server allows your viewrs to easily

# setup

# todo

* secure incoming rtmp
* secure metadata endpoint(s)
* get recording working
* TLS
* how to tell how many viewers there are?  some prior art seems to suggest looking at requests 
  for the playlist file(s) and timing clients out that don't request in N seconds.

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

