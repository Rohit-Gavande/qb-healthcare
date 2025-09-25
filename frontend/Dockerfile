# Frontend: Nginx serving static index.html
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy frontend files
COPY frontend/ .

# Replace default nginx.conf with custom proxy rules
COPY nginx.conf /etc/nginx/conf.d/default.conf
