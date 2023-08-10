# Base image with Node.js and npm pre-installed
FROM node:14

# Set the working directory
WORKDIR /var/apache2/html

RUN apt-get update -y
RUN apt-get install -y apache2
RUN apt-get install -y python3
# Project related operations
COPY . .
RUN mv ./scripts/.htaccess ./.htaccess
RUN npm install .

EXPOSE 80

CMD ["service", "apache2", "restart"]
