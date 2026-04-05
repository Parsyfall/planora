FROM node:20-alpine

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]