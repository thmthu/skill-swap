#!/bin/sh
if [ "$NODE_ENV" = "development" ]; then
    echo "Starting the application..."
    npm run dev
fi

exec "$@" 