FROM node:lts-slim

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn

COPY . /src

EXPOSE 3001

CMD ["yarn", "start"]
