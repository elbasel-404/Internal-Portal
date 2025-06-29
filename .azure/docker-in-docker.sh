#!/bin/sh

# Run Docker in Docker (dind) container in rootless mode
docker run -d --name some-docker --privileged docker:dind-rootless

# Verify the daemon has finished generating TLS certificates and is listening successfully
docker logs --tail=3 some-docker
# Expected output:
# time="xxx" level=info msg="Daemon has completed initialization"
# time="xxx" level=info msg="API listen on /run/user/1000/docker.sock"
# time="xxx" level=info msg="API listen on [::]:2376"

# Use "docker-entrypoint.sh" which auto-sets "DOCKER_HOST" appropriately
docker exec -it some-docker docker-entrypoint.sh sh

# Check Docker security options
docker info --format '{{ json .SecurityOptions }}'
# Expected output:
# ["name=seccomp,profile=default","name=rootless"]
