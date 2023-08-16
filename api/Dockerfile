FROM node:18

WORKDIR /api

COPY package.json yarn.lock /api/

RUN yarn

COPY . /api/

EXPOSE 3001

CMD ["yarn", "start"]