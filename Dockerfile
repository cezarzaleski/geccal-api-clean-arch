FROM node:16.16.0-slim as build

USER root

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
#RUN npm ci
COPY --chown=node:node . .
RUN npm install --global rimraf
RUN npm install -g @nestjs/cli@7.5.6
RUN npm run build

ENV NODE_ENV=prod
CMD [ "npm", "run", "start:prod" ]

FROM node:16.16.0-slim as production

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --from=build --chown=node:node /home/node/app/package*.json ./
RUN #npm ci --omit=dev

COPY --from=build --chown=node:node /home/node/app .

EXPOSE 3001

ENV NODE_ENV=prod
CMD [ "npm", "run", "start:prod" ]
