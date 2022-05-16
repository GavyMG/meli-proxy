FROM node:16.15.0

WORKDIR /meli_proxy

COPY package.json .

COPY package-lock.json .

run npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]