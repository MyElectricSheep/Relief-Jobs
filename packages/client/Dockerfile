FROM node:10

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

COPY . /app
# start app
CMD ["npm", "start"]