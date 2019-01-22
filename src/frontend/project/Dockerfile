FROM node:8.15-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install node-sass --save-dev

RUN npm run build

# Stage 2
FROM nginx:1.15.8-alpine

COPY --from=node /usr/src/app/dist/project /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf