FROM nginx:alpine
COPY ./nginx.conf /etc/nginx
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'