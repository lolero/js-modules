#!/bin/sh
set -e
DB_CORE_USERNAME=$(cat /run/secrets/db_core_username)
export DB_CORE_USERNAME
DB_CORE_PASSWORD=$(cat /run/secrets/db_core_password)
export DB_CORE_PASSWORD
exec pnpm typeorm migration:run
