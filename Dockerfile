FROM node:18.17.0-alpine

WORKDIR /works

COPY ./.yarnrc.yml ./package.json ./yarn.lock ./

RUN corepack enable
RUN yarn set version 4.3.1
RUN yarn install

COPY . ./

EXPOSE 3010

CMD ["yarn", "dev"]