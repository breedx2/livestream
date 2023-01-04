#!/bin/bash

docker run \
        -d \
        -v /home/owncast/owncast-data:/app/data \
        -p 8089:8080 \
        -p 1966:1935 \
        --name owncast \
        --restart unless-stopped \
        gabekangas/owncast:latest
