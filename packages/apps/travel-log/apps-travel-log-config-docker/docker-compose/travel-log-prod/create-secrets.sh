#!/bin/bash

# Manually create secrets:
# mkdir -p secrets
# chmod 770 secrets
# echo "secret_value" > secrets/<secret_name>
# chmod 660 secrets/*

# Docker Compose file
COMPOSE_FILE="./docker-compose.prod.yml"
SECRETS_DIR="./.secrets"

# Check if docker-compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Error: $COMPOSE_FILE not found!"
  exit 1
fi

# Create secrets directory
mkdir -p "$SECRETS_DIR"
chmod 770 "$SECRETS_DIR"

echo "This script will create all secrets from $COMPOSE_FILE"
echo "================================================================"
echo ""

# Extract secret names from docker-compose.prod.yml in order
# This looks for the secrets: section and extracts all secret names (non-indented keys after secrets:)
secret_names=$(awk '
/^secrets:/ { in_secrets=1; next }
in_secrets && /^[a-zA-Z]/ && !/^[[:space:]]/ { in_secrets=0 }
in_secrets && /^  [a-zA-Z_][a-zA-Z0-9_]*:/ {
    gsub(/^[[:space:]]+/, "");
    gsub(/:.*/, "");
    print
}
' "$COMPOSE_FILE")

# Check if we found any secrets
if [ -z "$secret_names" ]; then
  echo "No secrets found in $COMPOSE_FILE"
  exit 1
fi

# Function to determine if a secret should have hidden input
should_hide_input() {
  local secret_name=$1
  # Hide input for anything with "password" or "secret" in the name
  if [[ "$secret_name" == *"password"* ]] || [[ "$secret_name" == *"secret"* ]]; then
    return 0
  fi
  return 1
}

# Create each secret
while IFS= read -r secret_name; do
  secret_file="$SECRETS_DIR/$secret_name"

  if should_hide_input "$secret_name"; then
    echo -n "Enter value for $secret_name (or press Enter to skip): "
    read -rs secret_value < /dev/tty || {
      echo ""
      echo "⊘ Skipped $secret_name"
      echo ""
      continue
    }
    echo ""
  else
    echo -n "Enter value for $secret_name (or press Enter to skip): "
    read -r secret_value < /dev/tty || {
      echo "⊘ Skipped $secret_name"
      echo ""
      continue
    }
  fi

  # Skip if empty
  if [ -z "$secret_value" ]; then
    echo "⊘ Skipped $secret_name"
    echo ""
    continue
  fi

  echo -n "$secret_value" > "$secret_file"
  chmod 660 "$secret_file"
  echo "✓ Created $secret_name"
  echo ""
done <<< "$secret_names"

echo "================================================================"
echo "All secrets have been created successfully in $SECRETS_DIR"
echo "================================================================"
