FROM node:alpine

# zawsze ustawiać, nie opiszczać bo mozemy zaśmiecić
WORKDIR /opt/myapp

COPY ./package.json ./

RUN yarn install

COPY . .

CMD ["node", "index.js"]

