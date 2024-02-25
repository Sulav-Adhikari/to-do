#!/bin/bash
set -e

LOG_FILE="auto-stop-script.log"

exec &>> "$LOG_FILE"

docker stop pdatabase_container backend_container frontend_container

docker rm pdatabase_container backend_container frontend_container

docker network rm network-B-D
