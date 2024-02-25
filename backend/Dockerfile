FROM node:latest AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=builder /app .

COPY .env ./

EXPOSE 3000

RUN npm install -g knex  # Install Knex globally if not already installed

CMD sh -c 'npm run migrate && npm start'
