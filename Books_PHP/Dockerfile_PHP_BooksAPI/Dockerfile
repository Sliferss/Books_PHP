FROM php:7-apache
COPY . /var/www/html/
RUN a2enmod rewrite
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli