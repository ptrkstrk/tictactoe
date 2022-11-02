FROM node:16
WORKDIR /tictactoe-backend
COPY package.json .

RUN npm install

COPY . .
# EXPOSE 8080
CMD npm start
