FROM node:latest

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install

COPY . .
# start app
CMD ["node", "server.js"]