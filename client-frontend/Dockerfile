### STAGE 1: Build ###
FROM node:12 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/client-frontend /usr/share/nginx/html