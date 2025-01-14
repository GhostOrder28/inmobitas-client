FROM node:alpine3.18 as base

WORKDIR /app

ARG REACT_APP_BASE_URL

ENV REACT_APP_CLOUDINARY_UPLOAD_URL=https://res.cloudinary.com/ghost-order/image/upload/v1652147466

COPY . .

RUN npm install --include=dev
RUN npm run build

# CMD [ "npm", "run", "start" ]

FROM caddy:latest
RUN apk add --no-cache jq
COPY --from=base /app/build/ /srv
COPY --from=base /app/Caddyfile /etc/caddy/Caddyfile

EXPOSE 443
EXPOSE 3000
