FROM node:16.20.0-alpine3.18

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./public ./public
COPY ./src ./src
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js

RUN npm install

RUN echo "Enter your backend url:\"
ARG URL="http://localhost:4000"

ENV REACT_APP_BACKEND_URL=${URL}

EXPOSE 3000

CMD [ "npm","start" ]


