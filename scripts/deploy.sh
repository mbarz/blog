#!/bin/sh
# copy the public dir to the public dir on web
echo 'copy public dir to server...'
rsync -rav -e ssh --progress --delete public/. muxe@schedar.uberspace.de:/home/muxe/html/blog/

echo 'copy api logic'
rsync -rav -e ssh --delete --exclude=node_modules --exclude=config.json --exclude posts server/. muxe@schedar.uberspace.de:/home/muxe/api/blog
scp package.json muxe@schedar.uberspace.de:/home/muxe/api/blog/package.json
scp package-lock.json muxe@schedar.uberspace.de:/home/muxe/api/blog/package-lock.json
ssh muxe@schedar.uberspace.de 'source .bash_profile && svc -d ~/service/blog && cd /home/muxe/api/blog && npm install --production && svc -u ~/service/blog'

echo 'done. all files are copied to server. Nothing more to do.'