# Travel Log Production Deployment Guide

## Prepare VM

### System Requirements
- Ubuntu/Debian-based Linux distribution
- Docker Engine 20.10+
- Docker Compose 1.29+
- Minimum 4GB RAM
- 20GB+ available disk space
- Root or sudo access

### Connect
```bash
ssh <vm-username>@<vm-ip>
```

### Install deployment tools and start docker
```bash
su
apt update && apt upgrade -y
apt install docker.io docker-compose ufw rsync -y 
/usr/sbin/usermod -aG docker <username>
systemctl enable docker
systemctl start docker
exit
```

### Create Dedicated System User
Create a non-privileged user to run the application:

```bash
su
/usr/sbin/useradd -r -s /bin/false -d /opt/travel-log-app user-travel-log-app
/usr/sbin/usermod -aG docker user-travel-log-app
/usr/sbin/usermod -aG user-travel-log-app <username>
chmod g+w /opt/travel-log-app/
exit
```

### Set user in nginx Dockerfiles and docker-compose
Get user's uid and gid
```bash
id user-travel-log-app
```

### Directory Structure
```
/opt/travel-log-app/                          # Main application directory
├── docker-compose.prod.yml        # Docker compose file
├── docker-compose.prod.sh         # Startup script
├── create-secrets.sh              # Secrets creation script
├── .secrets/                      # Secrets directory (restricted access)
└── backups/                       # Database backups

/var/log/travel-log-app/                      # Application logs
```

#### Why `/opt/travel-log-app/`?
- `/opt/` is the standard location for third-party applications
- Separate from system files
- Easy to backup and manage
- Clear separation of concerns

### Set Up Application Directories
```bash
su
mkdir -p /opt/travel-log-app
chown -R user-travel-log-app:user-travel-log-app /opt/travel-log-app
chmod 770 /opt/travel-log-app
mkdir -p /var/log/travel-log-app
chown -R user-travel-log-app:user-travel-log-app /var/log/travel-log-app
chmod 770 /var/log/travel-log-app
mkdir -p /var/backups/travel-log-app
chown -R user-travel-log-app:user-travel-log-app /var/backups/travel-log-app
chmod 770 /var/backups/travel-log-app
exit
```

### Configure Firewall
```bash
su
/usr/sbin/ufw allow 80/tcp     # HTTP
/usr/sbin/ufw allow 443/tcp    # HTTPS (if using SSL)
/usr/sbin/ufw allow 22/tcp     # SSH (IMPORTANT - don't lock yourself out!)
/usr/sbin/ufw enable
/usr/sbin/ufw status
exit
```

## Deploy App

### Create SSL Certificates
```bash
  cd packages/apps/travel-log/apps-travel-log-config-docker/docker-compose/ && ./generate-ssl-cert.sh
```

### Sync files
Open a new local terminal at the root of the project:
```bash
  rsync -avz --progress \
    --include='ssl/***' \
    --include='create-secrets.sh' \
    --include='docker-compose.prod.sh' \
    --include='docker-compose.prod.yml' \
    --include='run-backups.sh' \
    --exclude='*' \
    packages/apps/travel-log/apps-travel-log-config-docker/docker-compose/travel-log-prod/ <vm-username>@<vm-ip>:/opt/travel-log-app/
```

After transferring files, on the VM's terminal:

#### Make scripts executable
```bash
cd /opt/travel-log-app
chmod +x create-secrets.sh
chmod +x docker-compose.prod.sh
chmod +x run-backups.sh
```

#### Set SSL Certificates perimssions
```bash
cd /opt/travel-log-app
su
chown -R user-travel-log-app:user-travel-log-app ssl
exit
```

### Create Secrets
```bash
cd /opt/travel-log-app
./create-secrets.sh
su
chown -R user-travel-log-app:user-travel-log-app /opt/travel-log-app/.secrets
chmod 770 /opt/travel-log-app/.secrets
chmod 660 /opt/travel-log-app/.secrets/*
exit
```

### Run docker-compose up
```bash
cd /opt/travel-log-app
./docker-compose.prod.sh up -d
```

### Set prod values in Keycloak Admin Console
#### SMTP Credentials
- From
- Username
- Password

### Update admin-cli and client-api-core secrets
```bash
cd /opt/travel-log-app
./create-secrets.sh
```

### Restart the api-core service
```bash
cd /opt/travel-log-app
./docker-compose.prod.sh up -d --force-recreate --no-deps api-core
```

### Execute migrations in api-core container
```bash
docker exec -it travel-log-app-api-core-1 /bin/sh -c './typeorm-migration-run.sh'
```

### Restart the api-core service again
```bash
cd /opt/travel-log-app
./docker-compose.prod.sh up -d --force-recreate --no-deps api-core
```

### Verify Deployment
```bash
# Check running containers
docker ps

# Check logs
cd /opt/travel-log-app
./docker-compose.prod.sh logs -f

# Check specific service
docker logs travel-log-app-<service name>-1
```

## Maintenance

### Build Updated Images
In local machine, from project root dir:

```bash
cd ./packages/apps/travel-log/apps-travel-log-config-docker/
./build-docker-images.sh
```

### Deploy Updates
```bash
cd /opt/travel-log-app

# Pull/load new images
./docker-compose.prod.sh pull

# Recreate containers with new images
./docker-compose.prod.sh up -d --force-recreate

# Wait a minute and restart the api-core service again after the auth-service is restarted
./docker-compose.prod.sh up -d --force-recreate --no-deps api-core

# Remove old images
docker image prune -a
```
