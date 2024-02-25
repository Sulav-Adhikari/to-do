#!/bin/bash
set -e

#LOG_FILE="auto-start-script.log"

#exec &>> "$LOG_FILE"

#Build images
docker build -t database_image ./database

docker build -t backend_imagee ./backend

docker build -t frontend_image ./frontend

#Create network
docker network create network-B-D


#Run containers
docker run --name pdatabase_container -itd -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -p 5433:5432 --network network-B-D database_image

docker run -itd --name backend_container  --network network-B-D -p 3000:3000 backend_imagee

docker run -itd --name frontend_container -p 5173:5173 frontend_image