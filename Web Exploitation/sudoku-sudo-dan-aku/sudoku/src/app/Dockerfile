FROM nginx:alpine

# Kita sesuaikan WORKDIR ke standar Nginx agar langsung bisa jalan
WORKDIR /usr/share/nginx/html

# Langsung copy semua file static (HTML/CSS/JS)
COPY . .

# Expose port 80
EXPOSE 80

# Jalankan server
CMD ["nginx", "-g", "daemon off;"]
