# Backend: Node.js Express + Postgres client
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy all backend source files
COPY . .

EXPOSE 5000

# Start the backend
CMD ["npm", "start"]

