FROM nginx:latest
WORKDIR /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]