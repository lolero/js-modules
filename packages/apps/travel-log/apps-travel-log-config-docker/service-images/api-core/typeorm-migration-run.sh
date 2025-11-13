#!/bin/sh
set -e
export DB_CORE_USERNAME=$(cat /run/secrets/db_core_username)
export DB_CORE_PASSWORD=$(cat /run/secrets/db_core_password)
exec pnpm typeorm migration:run
