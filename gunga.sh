#!/usr/bin/env sh

PIDS=""

cleanup() {
    echo "Cleaning up child processes..."
    for pid in $PIDS; do
        if kill -0 $pid 2>/dev/null; then
            kill $pid
            echo "Killed process $pid"
        fi
    done
    exit 0
}

trap cleanup INT TERM

index=0
while read token; do
  echo "GUNGA"
  TOKEN_VALUE=$(echo "$token" | cut -d'=' -f2)
  delay=$((2 * index))
  echo "Starting bot with delay: ${delay} seconds"
  TOKEN=$TOKEN_VALUE DELAY=$delay npm run start &
  PIDS="$PIDS $!"
  index=$((index + 1))
done < tokens

echo "All processes started. PIDs: $PIDS"
echo "Press Ctrl+C to stop all processes"

wait
