FROM node:alpine as mybuild

# zawsze ustawiać, nie opiszczać bo mozemy zaśmiecić
WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./ 

RUN yarn build

FROM nginx:alpine

COPY --from=mybuild /opt/app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf