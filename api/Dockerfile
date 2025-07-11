FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN 

EXPOSE 3001

CMD npm run migration:run && npm run start:prod


