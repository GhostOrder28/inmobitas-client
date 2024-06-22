FROM node:alpine3.18 

WORKDIR /app

ARG REACT_APP_BASE_URL

ENV REACT_APP_CLOUDINARY_UPLOAD_URL=https://res.cloudinary.com/ghost-order/image/upload/v1652147466

COPY . .

RUN npm install --include=dev
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 3000
