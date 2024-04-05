FROM node:alpine3.18

WORKDIR /app

# ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_CLOUDINARY_UPLOAD_URL=https://res.cloudinary.com/ghost-order/image/upload/v1652147466
ENV REACT_APP_BASE_URL=https://localhost:3001/

# ENV NODE_ENV=production

RUN apk add --no-cache caddy

COPY . /app

RUN npm install --include=dev

WORKDIR /app

RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 443
