FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application code
COPY . .

# Set environment variables for Cloud Run
ENV PORT=8080
ENV NODE_ENV=production

# Set default values for Redis config to avoid errors
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379
ENV MONGODB_URI=mongodb://localhost:27017/skillswap
ENV SESSION_SECRET=default-session-secret
ENV JWT_ACCESS_SECRET=default-access-secret
ENV JWT_REFRESH_SECRET=default-refresh-secret
ENV FRONTEND_URL=https://frontend-url

# Give Cloud Run time to verify your application is listening
ENV TIMEOUT=30000

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
