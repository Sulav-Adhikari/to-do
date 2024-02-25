FROM postgres:latest

WORKDIR /app

COPY .env ./

COPY init.sql /docker-entrypoint-initdb.d/

ENV DB_NAME=${DB_NAME}

ENV DB_USER=${DB_USER}

ENV DB_PASSWORD=${DB_PASSWORD}

EXPOSE 5432
