@echo off
echo Starting Angular and Node.js servers...

start cmd /k "cd App && ng serve"

start cmd /k "cd Server && node index.js"

echo Both servers are starting up in separate windows!