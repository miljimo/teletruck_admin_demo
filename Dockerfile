# Base image with Node.js and npm pre-installed
FROM node:14
WORKDIR /app
# Set the working directory

COPY package*.json ./
RUN npm install  --legacy-peer-deps
RUN npm install -g @vue/cli
# Project related operations
COPY . .
RUN mv ./scripts/.htaccess ./public/.htaccess
RUN npm run build

EXPOSE 80

CMD ["npm", "run" , "serve"]


