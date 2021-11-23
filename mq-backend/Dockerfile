# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:16

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install --production

# copy source
COPY . .

# run
EXPOSE 3100
CMD ["node", "server.js"]