FROM node:16.20.0-alpine3.18

WORKDIR /app

RUN echo "Installing npm packages..."
COPY package*.json ./
RUN npm install
RUN npm install -g serve
RUN echo "done.."

RUN echo "Copying files from current folder to working directory ...."
COPY . .
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


