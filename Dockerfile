# Base image for Node.js
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the application's port
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]    
