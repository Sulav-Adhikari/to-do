#For production
FROM node:20.11-bookworm-slim as BUILD_IMAGE

WORKDIR /app/react-app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
# For production
FROM nginx:1.25.4 as PROD_IMAGE

WORKDIR /usr/share/nginx/html

COPY --from=BUILD_IMAGE /app/react-app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]