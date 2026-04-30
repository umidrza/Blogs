# test stage
FROM node:24 AS test-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run test

# build stage
FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY --from=test-stage /usr/src/app /usr/src/app
RUN npm run build

# production stage
FROM nginx:1.29
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html