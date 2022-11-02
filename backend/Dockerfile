FROM node:16
COPY . /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
# COPY package.json ./

RUN npm install

# Bundle app source
# COPY ./src ./src
# COPY server.js ./
EXPOSE 8080
CMD [ "node", "server" ]
