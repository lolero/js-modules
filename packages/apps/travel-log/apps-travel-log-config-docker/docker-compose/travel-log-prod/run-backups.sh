#!/bin/bash

################################################################################
# Travel Log Application Backup Script
# This script creates backups of:
# - PostgreSQL databases (auth and core)
# - Docker volumes (auth and core data)
# - Secrets directory (encrypted)
################################################################################

set -e # Exit on error

# Configuration
BACKUP_DIR_BASE="/var/backups/travel-log-app"
BACKUP_DIR_DB="$BACKUP_DIR_BASE/db"
BACKUP_DIR_VOLUMES="$BACKUP_DIR_BASE/volumes"
BACKUP_DIR_SECRETS="$BACKUP_DIR_BASE/secrets"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Docker container names (adjust if your container names differ)
# These default to docker-compose naming: <directory>-<service>-1
COMPOSE_PROJECT="travel-log-prod"
CONTAINER_DB_AUTH="${COMPOSE_PROJECT}-db-auth-1"
CONTAINER_DB_CORE="${COMPOSE_PROJECT}-db-core-1"

# Docker volumes
VOLUME_AUTH="${COMPOSE_PROJECT}_volume_data_auth"
VOLUME_CORE="${COMPOSE_PROJECT}_volume_data_core"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

################################################################################
# Helper Functions
################################################################################

log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

check_container_running() {
  local container=$1
  if ! docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
    log_error "Container $container is not running"
    return 1
  fi
  return 0
}

create_backup_dirs() {
  log_info "Creating backup directories..."
  mkdir -p "$BACKUP_DIR_DB"
  mkdir -p "$BACKUP_DIR_VOLUMES"
  mkdir -p "$BACKUP_DIR_SECRETS"

  # Set restrictive permissions
  chmod 700 "$BACKUP_DIR_BASE"
  chmod 700 "$BACKUP_DIR_DB"
  chmod 700 "$BACKUP_DIR_VOLUMES"
  chmod 700 "$BACKUP_DIR_SECRETS"
}

################################################################################
# Database Backup Functions
################################################################################

backup_database() {
  local container=$1
  local db_name=$2
  local backup_file="$BACKUP_DIR_DB/${db_name}_${DATE}.sql"

  log_info "Backing up database: $db_name from container: $container"

  if ! check_container_running "$container"; then
    return 1
  fi

  # Get database username from Docker secrets
  local db_user
  db_user=$(docker exec "$container" sh -c 'cat /run/secrets/db_'"${db_name}"'_username 2>/dev/null || echo "postgres"')

  # Create database dump
  if docker exec "$container" pg_dump -U "$db_user" "$db_name" > "$backup_file"; then
    log_info "Database backup created: $backup_file"

    # Compress the backup
    gzip "$backup_file"
    log_info "Database backup compressed: ${backup_file}.gz"

    # Set restrictive permissions
    chmod 600 "${backup_file}.gz"

    return 0
  else
    log_error "Failed to backup database: $db_name"
    rm -f "$backup_file"
    return 1
  fi
}

backup_all_databases() {
  log_info "Starting database backups..."

  local success=0

  if backup_database "$CONTAINER_DB_AUTH" "auth"; then
    ((success++))
  fi

  if backup_database "$CONTAINER_DB_CORE" "core"; then
    ((success++))
  fi

  log_info "Database backups completed: $success/2 successful"

  if [ $success -eq 0 ]; then
    log_error "All database backups failed"
    return 1
  fi

  return 0
}

################################################################################
# Docker Volume Backup Functions
################################################################################

backup_volume() {
  local volume_name=$1
  local volume_label=$2
  local backup_file="$BACKUP_DIR_VOLUMES/${volume_label}_${DATE}.tar.gz"

  log_info "Backing up Docker volume: $volume_name"

  # Check if volume exists
  if ! docker volume ls --format '{{.Name}}' | grep -q "^${volume_name}$"; then
    log_error "Volume $volume_name does not exist"
    return 1
  fi

  # Create volume backup using a temporary container
  if docker run --rm \
    -v "${volume_name}:/data:ro" \
    -v "$BACKUP_DIR_VOLUMES:/backup" \
    alpine tar -czf "/backup/$(basename "$backup_file")" -C /data . 2> /dev/null; then

    log_info "Volume backup created: $backup_file"

    # Set restrictive permissions
    chmod 600 "$backup_file"

    return 0
  else
    log_error "Failed to backup volume: $volume_name"
    rm -f "$backup_file"
    return 1
  fi
}

backup_all_volumes() {
  log_info "Starting Docker volume backups..."

  local success=0

  if backup_volume "$VOLUME_AUTH" "volume_auth"; then
    ((success++))
  fi

  if backup_volume "$VOLUME_CORE" "volume_core"; then
    ((success++))
  fi

  log_info "Volume backups completed: $success/2 successful"

  if [ $success -eq 0 ]; then
    log_error "All volume backups failed"
    return 1
  fi

  return 0
}

################################################################################
# Secrets Backup Functions
################################################################################

backup_secrets() {
  local secrets_dir="/opt/travel-log/.secrets"
  local backup_file="$BACKUP_DIR_SECRETS/secrets_${DATE}.tar.gz"
  local encrypted_file="${backup_file}.gpg"

  log_info "Backing up secrets directory..."

  if [ ! -d "$secrets_dir" ]; then
    log_error "Secrets directory does not exist: $secrets_dir"
    return 1
  fi

  # Create compressed archive
  if tar -czf "$backup_file" -C "$(dirname "$secrets_dir")" "$(basename "$secrets_dir")"; then
    log_info "Secrets archive created: $backup_file"

    # Check if GPG is available
    if command -v gpg > /dev/null 2>&1; then
      log_warn "Encrypting secrets backup..."
      log_warn "You will be prompted for a passphrase. Remember this passphrase!"

      # Encrypt with GPG (symmetric encryption)
      if gpg --symmetric --cipher-algo AES256 "$backup_file"; then
        log_info "Secrets backup encrypted: $encrypted_file"

        # Remove unencrypted file
        rm -f "$backup_file"

        # Set restrictive permissions
        chmod 600 "$encrypted_file"

        log_warn "IMPORTANT: Store the encryption passphrase securely!"
        return 0
      else
        log_error "Failed to encrypt secrets backup"
        rm -f "$backup_file"
        return 1
      fi
    else
      log_warn "GPG not installed. Secrets backup is NOT encrypted!"
      log_warn "Install GPG for encrypted backups: sudo apt install gnupg"

      # Set very restrictive permissions on unencrypted file
      chmod 600 "$backup_file"

      return 0
    fi
  else
    log_error "Failed to create secrets backup"
    return 1
  fi
}

################################################################################
# Cleanup Functions
################################################################################

cleanup_old_backups() {
  log_info "Cleaning up backups older than $RETENTION_DAYS days..."

  local deleted=0

  # Clean database backups
  deleted=$(find "$BACKUP_DIR_DB" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
  if [ "$deleted" -gt 0 ]; then
    log_info "Deleted $deleted old database backup(s)"
  fi

  # Clean volume backups
  deleted=$(find "$BACKUP_DIR_VOLUMES" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
  if [ "$deleted" -gt 0 ]; then
    log_info "Deleted $deleted old volume backup(s)"
  fi

  # Clean secrets backups
  deleted=$(find "$BACKUP_DIR_SECRETS" -name "*.tar.gz*" -mtime +$RETENTION_DAYS -delete -print | wc -l)
  if [ "$deleted" -gt 0 ]; then
    log_info "Deleted $deleted old secrets backup(s)"
  fi

  log_info "Cleanup completed"
}

################################################################################
# Reporting Functions
################################################################################

show_backup_summary() {
  log_info "==================================================================="
  log_info "Backup Summary"
  log_info "==================================================================="
  log_info "Backup location: $BACKUP_DIR_BASE"
  log_info "Backup timestamp: $DATE"
  echo ""

  log_info "Database backups:"
  ls -lh "$BACKUP_DIR_DB"/*_"${DATE}".sql.gz 2> /dev/null || log_warn "No database backups created"
  echo ""

  log_info "Volume backups:"
  ls -lh "$BACKUP_DIR_VOLUMES"/*_"${DATE}".tar.gz 2> /dev/null || log_warn "No volume backups created"
  echo ""

  log_info "Secrets backups:"
  ls -lh "$BACKUP_DIR_SECRETS"/secrets_"${DATE}".* 2> /dev/null || log_warn "No secrets backups created"
  echo ""

  log_info "Total backup size:"
  du -sh "$BACKUP_DIR_BASE"
  echo ""

  log_info "==================================================================="
}

################################################################################
# Main Execution
################################################################################

main() {
  log_info "==================================================================="
  log_info "travel-log Application Backup - Started at $(date)"
  log_info "==================================================================="
  echo ""

  # Check if running as root or with sudo
  if [ "$EUID" -ne 0 ]; then
    log_warn "This script should be run as root or with sudo for best results"
  fi

  # Check if Docker is running
  if ! docker info > /dev/null 2>&1; then
    log_error "Docker is not running or you don't have permission to access it"
    exit 1
  fi

  # Create backup directories
  create_backup_dirs

  # Perform backups
  local backup_status=0

  if ! backup_all_databases; then
    backup_status=1
  fi
  echo ""

  if ! backup_all_volumes; then
    backup_status=1
  fi
  echo ""

  if ! backup_secrets; then
    backup_status=1
  fi
  echo ""

  # Cleanup old backups
  cleanup_old_backups
  echo ""

  # Show summary
  show_backup_summary

  # Final status
  if [ $backup_status -eq 0 ]; then
    log_info "==================================================================="
    log_info "Backup completed successfully at $(date)"
    log_info "==================================================================="
    exit 0
  else
    log_warn "==================================================================="
    log_warn "Backup completed with errors at $(date)"
    log_warn "==================================================================="
    exit 1
  fi
}

# Run main function
main "$@"
