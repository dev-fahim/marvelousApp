FROM node:latest

RUN mkdir /code
COPY . /code

WORKDIR /code/project

RUN npm install --global @angular/cli
RUN npm install --save
RUN npm install --save-dev @angular-devkit/build-angular
