FROM node:latest as build-stage

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

COPY . /app
# start app
#RUN npm run build
##CMD ["npm", "start"]

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
COPY ./build /www

COPY nginx.conf /etc/nginx/nginx.conf
#
#COPY ./build /www
##
#COPY nginx.conf /etc/nginx/nginx.conf
#
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#

