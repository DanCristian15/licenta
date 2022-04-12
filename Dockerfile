FROM imduffy15/nginx-vts:0.0.1

COPY ./docker/default.conf /etc/nginx/default.conf.template
COPY ./docker/api-headers.conf /etc/nginx/api-headers.conf

COPY ./docker/run.sh /usr/bin/run-vhost.sh
RUN chmod 755 /usr/bin/run-vhost.sh

COPY dist /usr/share/nginx/html

# Basic authentication. User passwords are located inside the .htpasswd file. Remove this for production.
COPY ./.htpasswd /etc/nginx/.htpasswd

ENTRYPOINT ["./usr/bin/run-vhost.sh"]
