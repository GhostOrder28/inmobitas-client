FROM node:alpine3.18

WORKDIR /app

ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_CLOUDINARY_UPLOAD_URL=https://res.cloudinary.com/ghost-order/image/upload/v1652147466
ENV REACT_APP_BASE_URL=https://localhost:3001/

RUN apk add --no-cache caddy
RUN apk add --no-cache npm

COPY /src .
COPY Caddyfile .
COPY package.json .
COPY sw-precache-config.js .

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
