FROM node:alpine

# zawsze ustawiać, nie opiszczać bo mozemy zaśmiecić
WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./ 

CMD yarn start