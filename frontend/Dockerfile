FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Xóa node_modules nếu tồn tại và cài đặt dependencies
RUN rm -rf node_modules && npm install

# Copy rest of the application
COPY . .

# Expose port 5173 for Vite
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]