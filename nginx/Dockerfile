FROM nginx:alpine

# Copy nginx template (envsubst will be run by nginx entrypoint)
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose HTTP
EXPOSE 80
