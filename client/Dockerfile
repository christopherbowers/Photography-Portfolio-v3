FROM node:lts-slim

WORKDIR /client

COPY package.json yarn.lock /client/

RUN yarn

COPY . /client/

RUN yarn build
