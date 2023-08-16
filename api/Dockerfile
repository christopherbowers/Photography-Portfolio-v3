FROM node:lts-slim

WORKDIR /api

COPY package.json yarn.lock /api/

RUN yarn

COPY . /api/

COPY --from=photo-portfolio-client /client/dist /client/dist

EXPOSE 3001

CMD ["yarn", "start"]
