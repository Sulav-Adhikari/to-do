# Build Stage
FROM node:20.11-bookworm-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM node:20.11-bookworm-slim AS production

WORKDIR /app

COPY --from=builder /app/src/db ./db

COPY package.json yarn.lock ./

RUN npm install

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=prod

EXPOSE 3000

CMD sh -c 'npm run migrate && npm start'
