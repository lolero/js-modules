#!/bin/bash
export DOCKER_CONTENT_TRUST=1

# Auto-generate .env from secrets when running 'up' commands
if [[ "$1" == "up" ]]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [ ! -f "$SCRIPT_DIR/.env" ]; then
    ROUTER_HOST=$(cat "$SCRIPT_DIR/.secrets/router_host")

    # Prompt for UID
    echo "Enter the UID for running containers (press Enter to use local UID $(id -u)):"
    read -r USER_UID_INPUT

    # Use local UID if blank
    if [ -z "$USER_UID_INPUT" ]; then
      USER_UID=$(id -u)
      echo "Using local UID: $USER_UID"
    else
      USER_UID="$USER_UID_INPUT"
      echo "Using specified UID: $USER_UID"
    fi

    # Write to .env file
    {
      echo "ROUTER_HOST=$ROUTER_HOST"
      echo "USER_UID=$USER_UID"
    } > "$SCRIPT_DIR/.env"

    echo "Generated .env file with ROUTER_HOST=$ROUTER_HOST and USER_UID=$USER_UID"
  fi
fi

docker compose -f docker-compose.prod.yml "$@"
