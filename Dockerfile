# Base image with Node.js and npm pre-installed
FROM ubuntu

# Set the working directory
WORKDIR /usr/local/apache2/htdocs/

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y nodejs 
RUN apt-get install -y npm
RUN apt-get install -y apache2
RUN a2enmod vhost_alias
RUN a2enmod rewrite 
RUN apt-get install -y vim
# Project related operations
COPY . .
RUN mv ./scripts/.htaccess ./.htaccess
RUN npm install .

EXPOSE 80

CMD ["systemctl", "start" , "apache2"]


