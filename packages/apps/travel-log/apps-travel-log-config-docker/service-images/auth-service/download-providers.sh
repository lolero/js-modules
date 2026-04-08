#!/bin/bash
set -e

# Configuration
PROVIDERS_DIR="providers"

# Create directory if it doesn't exist
mkdir -p "$PROVIDERS_DIR"

# Create .gitignore if it doesn't exist
if [ ! -f "$PROVIDERS_DIR/.gitignore" ]; then
  echo "*" > "$PROVIDERS_DIR/.gitignore"
fi

# Copy Keycloak theme JARs if they don't exist in providers
BUILD_KEYCLOAK_DIR="../../../apps-travel-log-web-keycloak-theme/build_keycloak"
if ls "$PROVIDERS_DIR"/keycloak-theme*.jar 1> /dev/null 2>&1; then
  echo "Keycloak theme JARs already exist in $PROVIDERS_DIR, skipping copy."
else
  echo "Copying Keycloak theme JARs from build_keycloak..."
  if [ -d "$BUILD_KEYCLOAK_DIR" ]; then
    cp -v "$BUILD_KEYCLOAK_DIR"/*.jar "$PROVIDERS_DIR"/ 2> /dev/null || echo "No JAR files found in build_keycloak"
  else
    echo "Warning: build_keycloak directory not found at $BUILD_KEYCLOAK_DIR"
  fi
fi

# Download Magic Link extension if it doesn't exist
MAGIC_LINK_VERSION="0.49"
if [ -f "$PROVIDERS_DIR/keycloak-magic-link.jar" ]; then
  echo "Keycloak Magic Link provider already exists, skipping download."
else
  # Download the Magic Link extension
  echo "Downloading Keycloak Magic Link extension version ${MAGIC_LINK_VERSION}..."
  echo "GitHub: https://github.com/p2-inc/keycloak-magic-link"
  echo "Maven: https://central.sonatype.com/artifact/io.phasetwo.keycloak/keycloak-magic-link"
  curl -L -o "$PROVIDERS_DIR/keycloak-magic-link.jar" "https://repo1.maven.org/maven2/io/phasetwo/keycloak/keycloak-magic-link/${MAGIC_LINK_VERSION}/keycloak-magic-link-${MAGIC_LINK_VERSION}.jar"
  echo "Magic Link extension downloaded successfully to $PROVIDERS_DIR/"
fi
