FROM node:alpine

WORKDIR /src
COPY . .

RUN rm -rf /src/node_modules
RUN rm -rf /src/package-lock.json
RUN yarn install

CMD yarn start:dev