#!/bin/bash

################################################################################
# Build Docker images for Travel Log services
# Features:
# - Optional Docker Hub authentication
# - Semantic versioning (major.minor.patch)
# - Interactive service selection
# - Dev mode (no authentication)
################################################################################

# Don't use set -e as we want to continue building other services even if one fails

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REGISTRY="lolero"
SERVICES=("router" "auth-service" "api-core" "client-web")

# Generate Dockerfile paths from services
DOCKERFILES=()
for service in "${SERVICES[@]}"; do
  DOCKERFILES+=("packages/apps/travel-log/apps-travel-log-config-docker/service-images/${service}/Dockerfile.${service}.prod")
done

# Global variables
AUTHENTICATED=false
DEV_MODE=false
DOCKER_USERNAME=""
DOCKER_PASSWORD=""
USER_UID=""
DOMAIN_PROD=""
declare -A SELECTED_SERVICES
declare -A SERVICE_VERSIONS
declare -A VERSION_UPDATES

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

log_section() {
  echo -e "${BLUE}===================================================================${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}===================================================================${NC}"
}

################################################################################
# Docker Hub Authentication
################################################################################

check_docker_auth() {
  # Check if already authenticated to Docker Hub
  if docker info 2> /dev/null | grep -q "Username:"; then
    return 0 # authenticated
  else
    return 1 # not authenticated
  fi
}

get_docker_username() {
  # Get the current authenticated username
  docker info 2> /dev/null | grep "Username:" | awk '{print $2}'
}

prompt_dev_mode() {
  log_section "Build Mode Selection"
  echo ""
  echo "Do you want to run in dev mode?"
  echo "(Dev mode skips authentication and builds with 'dev' tag only)"
  echo ""

  while true; do
    read -rp "Dev mode? (y/n): " choice
    case $choice in
      [Yy])
        log_warn "Entering DEV MODE"
        log_warn "Images will be built with 'dev' tag only"
        DEV_MODE=true
        return 0
        ;;
      [Nn])
        return 1
        ;;
      *)
        log_error "Invalid choice. Please enter y or n."
        ;;
    esac
  done
}

prompt_user_uid() {
  log_section "User UID Configuration"
  echo ""
  echo "Enter the UID that the containers should run as."
  echo "This should match the UID of the user on the target system."
  echo ""
  log_info "Press Enter to use current local UID as default: $(id -u) NOT RECOMMENDED!!!"
  echo ""

  while true; do
    read -rp "User UID: " uid_input

    # If empty, use current user's UID as default
    if [ -z "$uid_input" ]; then
      USER_UID=$(id -u)
      log_info "Using default UID: $USER_UID"
      echo ""
      return 0
    fi

    # Validate that it's a number
    if ! [[ "$uid_input" =~ ^[0-9]+$ ]]; then
      log_error "UID must be a numeric value"
      continue
    fi

    # Validate reasonable range (typically 100-65534)
    if [ "$uid_input" -lt 100 ] || [ "$uid_input" -gt 65534 ]; then
      log_error "UID $uid_input is outside valid range (100-65534)"
      continue
    fi

    USER_UID="$uid_input"
    log_info "Using UID: $USER_UID"
    echo ""
    return 0
  done
}

prompt_domain_prod() {
  log_section "Production Domain Configuration"
  echo ""
  echo "Enter the production domain for the application."
  echo "This will be used to configure the router and other services."
  echo "(e.g., example.com or app.example.com)"
  echo ""
  log_info "Press Enter to use default: localhost"
  echo ""

  while true; do
    read -rp "Production Domain: " domain_input

    # If empty, use localhost as default
    if [ -z "$domain_input" ]; then
      DOMAIN_PROD="localhost"
      log_info "Using default production domain: $DOMAIN_PROD"
      echo ""
      return 0
    fi

    # Validate domain format (basic check)
    if ! [[ "$domain_input" =~ ^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ ]]; then
      log_error "Invalid domain format"
      continue
    fi

    DOMAIN_PROD="$domain_input"
    log_info "Using production domain: $DOMAIN_PROD"
    echo ""
    return 0
  done
}

prompt_credentials() {
  log_section "Docker Hub Authentication"
  echo ""
  echo "Enter Docker Hub credentials (or press Enter on both to skip for dev mode):"
  echo ""

  # Prompt for username
  read -rp "Docker Hub Username: " username_input

  # Prompt for password (hidden)
  read -rs -p "Docker Hub Password: " password_input
  echo ""
  echo ""

  # Check if both are empty
  if [ -z "$username_input" ] && [ -z "$password_input" ]; then
    log_warn "Skipping authentication - entering DEV MODE"
    log_warn "Images will be built with 'dev' tag only"
    DEV_MODE=true
    return 0
  fi

  # Check if only one is empty
  if [ -z "$username_input" ] || [ -z "$password_input" ]; then
    log_error "Both username and password are required for authentication"
    return 1
  fi

  # Attempt authentication
  log_info "Authenticating with Docker Hub..."
  if echo "$password_input" | docker login -u "$username_input" --password-stdin 2> /dev/null; then
    log_info "Authentication successful!"
    AUTHENTICATED=true
    # Store credentials for API calls
    DOCKER_USERNAME="$username_input"
    DOCKER_PASSWORD="$password_input"
    return 0
  else
    log_error "Authentication failed. Please check your credentials."
    return 1
  fi
}

################################################################################
# Version Management
################################################################################

get_docker_hub_token() {
  # Get Docker Hub token for API access using stored credentials
  if [ -z "$DOCKER_USERNAME" ] || [ -z "$DOCKER_PASSWORD" ]; then
    echo ""
    return
  fi

  # Get token from Docker Hub API
  local token
  token=$(curl -s -H "Content-Type: application/json" \
    -X POST \
    -d "{\"username\": \"$DOCKER_USERNAME\", \"password\": \"$DOCKER_PASSWORD\"}" \
    https://hub.docker.com/v2/users/login/ 2> /dev/null | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

  echo "$token"
}

get_latest_version() {
  local service=$1
  local image="${REGISTRY}/travel-log-${service}"

  # Get authentication token if logged in
  local token
  token=$(get_docker_hub_token)

  # Try to get tags from Docker Hub
  local tags=""
  if [ -n "$token" ]; then
    # Authenticated request
    tags=$(curl -s -H "Authorization: Bearer $token" \
      "https://hub.docker.com/v2/repositories/${image}/tags?page_size=100" 2> /dev/null)
  else
    # Unauthenticated request (for public repos)
    tags=$(curl -s "https://hub.docker.com/v2/repositories/${image}/tags?page_size=100" 2> /dev/null)
  fi

  if [ -z "$tags" ]; then
    echo "0.0.0"
    return
  fi

  # Extract version tags (format: v1.2.3)
  local versions
  versions=$(echo "$tags" | grep -o '"name":"v[0-9]\+\.[0-9]\+\.[0-9]\+"' | grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' || echo "")

  if [ -z "$versions" ]; then
    echo "0.0.0"
    return
  fi

  # Sort versions and get the highest
  local latest
  latest=$(echo "$versions" | sed 's/v//' | sort -V | tail -1)
  echo "$latest"
}

increment_version() {
  local version=$1
  local update_type=$2

  IFS='.' read -r major minor patch <<< "$version"

  case $update_type in
    major)
      major=$((major + 1))
      minor=0
      patch=0
      ;;
    minor)
      minor=$((minor + 1))
      patch=0
      ;;
    patch)
      patch=$((patch + 1))
      ;;
  esac

  echo "${major}.${minor}.${patch}"
}

prompt_version_update() {
  local service=$1
  local current_version=$2

  # Parse version into components
  IFS='.' read -r major minor patch <<< "$current_version"

  # Calculate incremented versions for display
  local major_next=$((major + 1))
  local minor_next=$((minor + 1))
  local patch_next=$((patch + 1))

  echo ""
  log_section "Version Update for $service"
  echo ""
  echo "Current version: v${current_version}"
  echo ""
  echo "Select update type:"
  echo "  [1] Major (v${current_version} -> v${major_next}.0.0)"
  echo "  [2] Minor (v${current_version} -> v${major}.${minor_next}.0)"
  echo "  [3] Patch (v${current_version} -> v${major}.${minor}.${patch_next})"
  echo ""

  while true; do
    read -rp "Enter choice [1-3]: " choice
    case $choice in
      1)
        VERSION_UPDATES[$service]="major"
        break
        ;;
      2)
        VERSION_UPDATES[$service]="minor"
        break
        ;;
      3)
        VERSION_UPDATES[$service]="patch"
        break
        ;;
      *)
        log_error "Invalid choice. Please enter 1, 2, or 3."
        ;;
    esac
  done

  local new_version
  new_version=$(increment_version "$current_version" "${VERSION_UPDATES[$service]}")
  SERVICE_VERSIONS[$service]=$new_version

  log_info "New version will be: v${new_version}"
  echo ""
}

################################################################################
# Service Selection
################################################################################

fetch_versions() {
  log_section "Fetching Latest Versions from Docker Hub"
  echo ""

  for service in "${SERVICES[@]}"; do
    log_info "Fetching version for $service..."
    local version
    version=$(get_latest_version "$service")
    SERVICE_VERSIONS[$service]=$version
  done

  echo ""
}

interactive_service_selection() {
  log_section "Service Selection"
  echo ""
  echo "Use SPACE to select/deselect services, ENTER to confirm:"
  echo ""

  local selected=()
  for service in "${SERVICES[@]}"; do
    selected+=("false")
  done

  local current_index=0
  local total=${#SERVICES[@]}

  # Save terminal settings
  local old_stty
  old_stty=$(stty -g)

  # Set terminal to raw mode for single character input
  stty raw -echo

  while true; do
    # Restore terminal temporarily to print
    stty "$old_stty"

    # Clear screen and redraw menu
    clear
    log_section "Service Selection"
    echo ""
    echo "Use SPACE to select/deselect services, ENTER to confirm:"
    echo ""

    # Display menu
    for i in "${!SERVICES[@]}"; do
      local service="${SERVICES[$i]}"
      local version="${SERVICE_VERSIONS[$service]}"
      local checkbox="[ ]"

      if [ "${selected[$i]}" = "true" ]; then
        checkbox="[x]"
      fi

      if [ "$i" -eq "$current_index" ]; then
        echo -e "${GREEN}> ${checkbox} ${service} ${NC}(current: v${version})"
      else
        echo "  ${checkbox} ${service} (current: v${version})"
      fi
    done

    echo ""
    echo "Press SPACE to toggle, UP/DOWN arrows to navigate, ENTER to continue"

    # Set terminal to raw mode for reading
    stty raw -echo

    # Read single character
    key=$(dd bs=1 count=1 2> /dev/null)

    # Handle the key press
    if [[ "$key" == " " ]]; then
      # Space - toggle selection
      if [ "${selected[$current_index]}" = "true" ]; then
        selected[current_index]="false"
      else
        selected[current_index]="true"
      fi
    elif [[ "$key" == $'\x1b' ]]; then
      # Escape sequence (arrow keys)
      key2=$(dd bs=1 count=1 2> /dev/null)
      key3=$(dd bs=1 count=1 2> /dev/null)
      if [[ "$key2$key3" == "[A" ]]; then
        # Up arrow
        if [ $current_index -gt 0 ]; then
          current_index=$((current_index - 1))
        fi
      elif [[ "$key2$key3" == "[B" ]]; then
        # Down arrow
        if [ $current_index -lt $((total - 1)) ]; then
          current_index=$((current_index + 1))
        fi
      fi
    elif [[ "$key" == $'\n' ]] || [[ "$key" == $'\r' ]]; then
      # Enter was pressed (newline or carriage return)
      break
    fi
  done

  # Restore terminal settings
  stty "$old_stty"

  # Store selected services
  echo ""
  log_info "Selected services:"
  for i in "${!SERVICES[@]}"; do
    if [ "${selected[$i]}" = "true" ]; then
      SELECTED_SERVICES[${SERVICES[$i]}]="true"
      echo "  - ${SERVICES[$i]}"
    fi
  done

  # Check if any service was selected
  if [ ${#SELECTED_SERVICES[@]} -eq 0 ]; then
    log_error "No services selected. Exiting."
    exit 0
  fi

  echo ""
}

################################################################################
# Build Functions
################################################################################

build_service() {
  local service=$1
  local dockerfile=$2
  local tag=$3
  local user_uid=${4:-$USER_UID}       # Default to USER_UID if not provided
  local domain_prod=${5:-$DOMAIN_PROD} # Default to DOMAIN_PROD if not provided

  local image="${REGISTRY}/travel-log-${service}"

  log_info "Building ${image}:${tag} with USER_UID=${user_uid} and DOMAIN_PROD=${domain_prod}..."

  if docker build -f "$dockerfile" -t "${image}:${tag}" --build-arg USER_UID="${user_uid}" --build-arg DOMAIN_PROD="${domain_prod}" .; then
    log_info "Successfully built ${image}:${tag}"
    return 0
  else
    log_error "Failed to build ${image}:${tag}"
    return 1
  fi
}

push_service() {
  local service=$1
  local tag=$2

  local image="${REGISTRY}/travel-log-${service}"

  log_info "Pushing ${image}:${tag}..."

  if docker push "${image}:${tag}"; then
    log_info "Successfully pushed ${image}:${tag}"
    return 0
  else
    log_error "Failed to push ${image}:${tag}"
    return 1
  fi
}

build_all_services() {
  log_section "Building Docker Images"
  echo ""

  # Change to project root
  cd ../../../../..

  local build_count=0
  local push_count=0
  local skip_count=0

  for i in "${!SERVICES[@]}"; do
    local service="${SERVICES[$i]}"
    local dockerfile="${DOCKERFILES[$i]}"

    # Skip if not selected
    if [ "${SELECTED_SERVICES[$service]}" != "true" ]; then
      continue
    fi

    echo ""
    log_section "Processing: $service"
    echo ""

    if [ "$DEV_MODE" = true ]; then
      # Dev mode - build with 'dev' tag only
      local image="${REGISTRY}/travel-log-${service}:dev"

      # Check if image already exists locally
      if docker image inspect "$image" > /dev/null 2>&1; then
        log_info "Image $image already exists locally, skipping build"
        ((skip_count++))
      else
        if build_service "$service" "$dockerfile" "dev" "$USER_UID"; then
          ((build_count++))
        fi
      fi
    else
      # Production mode - build with version and latest tags
      local version="${SERVICE_VERSIONS[$service]}"
      local image="${REGISTRY}/travel-log-${service}:v${version}"

      # Check if version already exists locally
      if docker image inspect "$image" > /dev/null 2>&1; then
        log_info "Image $image already exists locally, skipping build"
        ((skip_count++))
      else
        # Build with version tag
        if build_service "$service" "$dockerfile" "v${version}" "$USER_UID" "$DOMAIN_PROD"; then
          ((build_count++))

          # Tag as latest
          docker tag "${REGISTRY}/travel-log-${service}:v${version}" "${REGISTRY}/travel-log-${service}:latest"

          # Push both tags if authenticated
          if [ "$AUTHENTICATED" = true ]; then
            push_service "$service" "v${version}"
            push_service "$service" "latest"
            ((push_count++))
          fi
        fi
      fi
    fi
  done

  echo ""
  log_section "Build Summary"
  echo ""
  log_info "Successfully built $build_count service(s)"
  log_info "Skipped $skip_count service(s) (already exist)"

  if [ "$AUTHENTICATED" = true ]; then
    log_info "Successfully pushed $push_count service(s) to Docker Hub"
  fi

  echo ""
}

################################################################################
# Main Execution
################################################################################

main() {
  clear
  log_section "Travel Log Docker Image Builder"
  echo ""

  # Step 1: Check mode (dev or production)
  if prompt_dev_mode; then
    # Dev mode - use local user's UID
    USER_UID=$(id -u)
    log_info "Dev mode: Using local user UID: $USER_UID"
    echo ""
  else
    # Production mode - handle authentication
    echo ""

    if check_docker_auth; then
      local current_user
      current_user=$(get_docker_username)
      log_section "Docker Hub Authentication Status"
      echo ""
      echo "Already authenticated as: $current_user"
      echo ""

      while true; do
        read -rp "Continue as $current_user? (y/n): " choice
        case $choice in
          [Yy])
            log_info "Using existing authentication"
            AUTHENTICATED=true
            DOCKER_USERNAME="$current_user"

            # Need password for API access to fetch versions
            echo ""
            read -rs -p "Enter Docker Hub password (for API access to fetch versions): " password_input
            echo ""
            DOCKER_PASSWORD="$password_input"

            break
            ;;
          [Nn])
            # Logout and prompt for new credentials
            docker logout 2> /dev/null
            echo ""
            if ! prompt_credentials; then
              exit 1
            fi
            break
            ;;
          *)
            log_error "Invalid choice. Please enter y or n."
            ;;
        esac
      done
    else
      # Not authenticated - prompt for credentials
      if ! prompt_credentials; then
        exit 1
      fi
    fi

    # Production mode - prompt for USER_UID and DOMAIN_PROD after successful authentication
    prompt_user_uid
    prompt_domain_prod

    echo ""
  fi

  # Step 2: Fetch versions (only if authenticated)
  if [ "$AUTHENTICATED" = true ]; then
    fetch_versions
  fi

  # Step 3: Select services
  if [ "$AUTHENTICATED" = true ]; then
    interactive_service_selection

    # Step 4: Prompt for version updates
    for service in "${!SELECTED_SERVICES[@]}"; do
      if [ "${SELECTED_SERVICES[$service]}" = "true" ]; then
        local current_version="${SERVICE_VERSIONS[$service]}"
        prompt_version_update "$service" "$current_version"
      fi
    done
  else
    # Dev mode - select all services
    log_warn "Dev mode: All services will be built"
    for service in "${SERVICES[@]}"; do
      SELECTED_SERVICES[$service]="true"
    done
  fi

  # Step 5: Build services
  build_all_services

  # Step 6: Logout (optional)
  if [ "$AUTHENTICATED" = true ]; then
    echo ""
    read -rp "Logout from Docker Hub? (y/n): " logout_choice
    case $logout_choice in
      [Yy])
        docker logout
        log_info "Logged out from Docker Hub"
        ;;
      [Nn])
        log_info "Staying logged in to Docker Hub"
        ;;
      *)
        log_warn "Invalid choice, staying logged in to Docker Hub"
        ;;
    esac
  fi

  echo ""
  log_section "Build Complete!"
  echo ""
}

# Run main
main "$@"
