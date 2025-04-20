FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "3000", "--public", "localhost:3001", "--watch-poll"]
# CMD ["npm", "run", "build"]