#!/bin/bash

set -e 

source env.sh

terraform apply -auto-approve
source ansible-env/bin/activate
export OWNCAST_IP=$(terraform output -raw ip_address)
SITE=$(echo ${OWNCAST_PROXY_HOST} | sed -e "s/\./_/g")-site

if [ ! -d templates/out ] ; then
      mkdir templates/out
fi

# Set up our templates
jinja -D ip ${OWNCAST_IP} templates/hosts-owncast_template > templates/out/hosts-owncast
jinja -D host ${OWNCAST_PROXY_HOST} \
      -D ip ${OWNCAST_IP} \
      -D site ${SITE} \
      templates/nginx-config_template > templates/out/nginx-config
# Inject stream key secret as override
cat deploy/owncast_config.json | \
      jq ". += {\"streamKey\": \"${OWNCAST_STREAM_KEY}\"}" > templates/out/owncast_config.json

jinja -D user ${OWNCAST_PROXY_USER} \
      -D port ${OWNCAST_PROXY_SSH_PORT} \
      -D site ${OWNCAST_PROXY_HOST} \
      templates/hosts-nginx_template > templates/out/hosts-nginx

ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i templates/out/hosts-owncast deploy/wait-for-available-playbook.yml
ansible-playbook -i templates/out/hosts-owncast deploy/owncast-playbook.yml

# ansible-playbook --ask-become-pass -i templates/out/hosts-nginx deploy/nginx-playbook.yml
