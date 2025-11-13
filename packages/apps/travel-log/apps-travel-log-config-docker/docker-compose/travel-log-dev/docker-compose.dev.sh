#!/bin/bash
set -a
source ../../service-images/auth-service/.env.dev
source ../../../apps-travel-log-api-core/.env.dev

# Download third-party providers before starting services
if [[ "$1" == "up" ]]; then
    echo "Downloading third-party providers..."
    cd ../../service-images/auth-service && ./download-providers.sh && cd -
fi

docker-compose -f docker-compose.dev.yml "$@"
