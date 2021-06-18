FROM node:alpine

# zawsze ustawiać, nie opiszczać bo mozemy zaśmiecić
WORKDIR /opt/app

COPY ./ ./

RUN yarn install

COPY ./ ./ 

CMD yarn start

