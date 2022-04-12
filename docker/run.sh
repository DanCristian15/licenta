#!/bin/sh

if [ "$NAMESERVER" = "" ]; then
  export NAMESERVER=$(awk '/^nameserver/{print $2}' /etc/resolv.conf)
fi

envsubst '$NAMESERVER $KEYCLOAK_URL $COMPOSITE_SERVICE_NAME' < /etc/nginx/default.conf.template > /etc/nginx/conf.d/default.conf

exec /usr/bin/run.sh