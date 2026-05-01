FROM node:18-alpine

# Buat working directory
WORKDIR /app

# Copy package.json dulu (untuk cache layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file project
COPY . .

# Expose port Express
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]