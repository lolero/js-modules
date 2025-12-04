#!/bin/bash

# Ask user for environment
echo "Are these certificates for development or production?"
echo "1) Development (localhost)"
echo "2) Production (custom IP)"
read -r -p "Enter choice (1 or 2): " ENV_CHOICE

if [ "$ENV_CHOICE" = "1" ]; then
  # Development environment
  ENV_DIR="./travel-log-dev"
  CERT_CN="localhost"
  CERT_SAN="DNS:localhost,IP:127.0.0.1,IP:10.0.2.2"
  echo "Generating certificates for DEVELOPMENT environment..."
elif [ "$ENV_CHOICE" = "2" ]; then
  # Production environment
  ENV_DIR="./travel-log-prod"
  read -r -p "Enter the IP address for the certificate: " CERT_IP
  CERT_CN="$CERT_IP"
  CERT_SAN="IP:$CERT_IP"
  echo "Generating certificates for PRODUCTION environment with IP: $CERT_IP"
else
  echo "Invalid choice. Exiting."
  exit 1
fi

# Check if SSL directory already exists
if [ -d "$ENV_DIR/ssl" ]; then
  echo "Error: SSL directory already exists at $ENV_DIR/ssl/"
  echo "Please remove it first if you want to regenerate certificates."
  exit 1
fi

# Create directory for SSL certificates
mkdir -p "$ENV_DIR/ssl"

# Create .gitignore to exclude all files in ssl directory
echo "*" > "$ENV_DIR/ssl/.gitignore"

# Generate self-signed certificate valid for 365 days
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$ENV_DIR/ssl/nginx-selfsigned.key" \
  -out "$ENV_DIR/ssl/nginx-selfsigned.crt" \
  -subj "/C=DE/ST=Bavaria/L=Nuremberg/O=lolero/CN=$CERT_CN" \
  -addext "subjectAltName=$CERT_SAN"

# Generate dhparam for better security (this takes a while)
echo "Generating dhparam (this may take a few minutes)..."
openssl dhparam -out "$ENV_DIR/ssl/dhparam.pem" 2048

chmod 644 "$ENV_DIR/ssl/"*.crt
chmod 600 "$ENV_DIR/ssl/"*.key
chmod 644 "$ENV_DIR/ssl/"*.pem

echo ""
echo "SSL certificates generated successfully!"
echo "Location: $ENV_DIR/ssl/"
echo "- Certificate: $ENV_DIR/ssl/nginx-selfsigned.crt"
echo "- Private Key: $ENV_DIR/ssl/nginx-selfsigned.key"
echo "- DH Params: $ENV_DIR/ssl/dhparam.pem"
