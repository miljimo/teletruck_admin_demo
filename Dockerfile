# Base image with Node.js and npm pre-installed
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

RUN apt-get update && apt-get install -y apache2 \
   apt update  \
  apt install python2

COPY . .
RUN npm install
RUN npm run build


# Use a smaller Nginx base image to serve the application
FROM nginx:1.21

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the production build from the previous stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (the default port for HTTP)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
