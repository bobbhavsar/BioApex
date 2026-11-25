#!/bin/bash
# BioApex Independent Launcher (macOS Double-Clickable)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================================="
echo "  BioApex • USABO Finalist & IBO Gold Training Academy"
echo "=========================================================="
echo "Starting local independent server..."

PORT=3456
# Check if port is already running
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Killing old server on port $PORT..."
    kill -9 $(lsof -Pi :$PORT -sTCP:LISTEN -t) 2>/dev/null || true
    sleep 1
fi

python3 server.py $PORT &
SERVER_PID=$!
echo "BioApex robust server started with PID $SERVER_PID."

# Open in default browser
sleep 1
if command -v open > /dev/null; then
    open "http://localhost:$PORT"
elif command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:$PORT"
fi

echo ""
echo "BioApex is running at: http://localhost:$PORT"
echo "You can keep this terminal window open while studying."
echo "Press Ctrl+C to stop the server when done."
wait
