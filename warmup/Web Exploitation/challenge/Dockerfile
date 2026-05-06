FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy challenge files
COPY src/ /usr/share/nginx/html/

# Standard Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
