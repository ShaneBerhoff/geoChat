FROM node:latest
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm run install-all

# Copy rest of files
COPY . .

EXPOSE 3000
CMD ["npm", "run", "prod"]