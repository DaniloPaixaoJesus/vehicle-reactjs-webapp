FROM nginx:latest
MAINTAINER Danilo Paixao
COPY /vehicle-reactjs-webapp/build /var/www/public
COPY /vehicle-reactjs-webapp/config/nginx.conf /etc/nginx/nginx.conf
COPY /vehicle-reactjs-webapp/config/ssl/cert.key /etc/nginx/ssl/cert.key
COPY /vehicle-reactjs-webapp/config/ssl/cert.crt /etc/nginx/ssl/cert.crt
RUN chmod 755 -R /var/www/public
EXPOSE 80 443
ENTRYPOINT ["nginx"]
# Parametros extras para o entrypoint
CMD ["-g", "daemon off;"]
