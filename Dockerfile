FROM nginxinc/nginx-unprivileged:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY favicon.ico index.html styles.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY fonts /usr/share/nginx/html/fonts
COPY images /usr/share/nginx/html/images
COPY js /usr/share/nginx/html/js

EXPOSE 8080
