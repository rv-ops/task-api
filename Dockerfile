# ---- Base image ----
FROM node:20-alpine

# ---- Set working directory ----
WORKDIR /app

# ---- Copy package files ----
COPY package*.json ./

# ---- Install dependencies ----
RUN npm install

# ---- Copy app code ----
COPY . .

# ---- Build Next.js ----
RUN npm run build

# ---- Expose port ----
EXPOSE 3000

# ---- Start production server ----
CMD ["npm", "run", "start"]
