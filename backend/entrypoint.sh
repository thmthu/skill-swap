#!/bin/sh
if [ "$NODE_ENV" = "development" ]; then
    echo "Waiting for MongoDB to be ready..."
    sleep 5
    echo "Seeding data..."
    node data/seedData.js
    echo "Starting the application..."
    npm run dev
fi

exec "$@" 