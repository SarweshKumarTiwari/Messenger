FROM node:16.20.0-alpine3.18

WORKDIR /app

RUN echo "Copying files from current folder to working directory ...."
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./public ./public
COPY ./src ./src
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json
RUN echo "done.."

RUN echo "Installing npm packages..."
RUN npm install
RUN npm install -g serve
RUN echo "done.."

RUN echo "Enter your backend url:"
ARG URL="http://localhost:4000"

ENV REACT_APP_BACKEND_URL=${URL}

RUN echo "running build"
RUN npm run build
RUN echo "done.."

EXPOSE 3000

#CMD [ "npm","start" ]

CMD [ "serve","-s","build" ]


