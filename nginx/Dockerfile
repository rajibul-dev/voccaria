FROM nginx:alpine

# REMOVE default config that nginx ships with
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy only the template
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose HTTP
EXPOSE 80
