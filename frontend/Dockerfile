FROM node:16 as build-stage

WORKDIR /tictactoe-frontend
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /tictactoe-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
