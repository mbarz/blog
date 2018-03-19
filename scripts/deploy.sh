#!/bin/sh
# copy the public dir to the public dir on web
echo 'copy to server...'
scp -r public/* muxe@schedar.uberspace.de:/home/muxe/html/blog
echo 'done. all files are copied to server. Nothing more to do.'