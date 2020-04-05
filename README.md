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
* how to tell how many viewers there are?  some prior art seems to suggest looking at requests 
  for the playlist file(s) and timing clients out that don't request in N seconds.
