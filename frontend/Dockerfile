# Frontend: Nginx serving static files
FROM nginx:alpine

# Set working directory to Nginx HTML folder
WORKDIR /usr/share/nginx/html

# Copy all frontend files (index.html, JS, CSS, static folder)
COPY static/ .

# Replace default nginx.conf with custom proxy rules
COPY nginx.conf /etc/nginx/conf.d/default.conf

