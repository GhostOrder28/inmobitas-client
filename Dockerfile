FROM node:alpine3.18

WORKDIR /app

RUN apk add --no-cache caddy
RUN apk add --no-cache npm

COPY /src .
COPY .env .
COPY Caddyfile .
COPY package.json .
COPY sw-precache-config.js .

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
