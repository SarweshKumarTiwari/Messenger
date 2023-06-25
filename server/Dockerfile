#getting node image from dockerhub
FROM node:16.20.0-alpine3.18

#Initializing working directory
WORKDIR /server

#Copying files to root directory and files in dockerignore will be ignored
COPY package*.json ./

#INSTALLING PACKAGES
RUN echo "installing npm dependencies"
RUN npm install
RUN npm install ts-node -g


COPY . .

#Setting up ARGS variables
ARG PORT="4000"
ARG DB_URI="mongodb://localhost:27017/Messenger"
ARG ORIGIN="http://localhost:3000"
ARG ACCESS_TOKEN="78a3ea49ef8336d638fc2413d5150496270853dddbe5e3a086816b53827f07ad279a129bbc98f55be4a62e5a"

#Setting enviornment variables
RUN echo "initializing enviornment variables"
ENV PORT=${PORT}
ENV DB_URI=${DB_URI}
ENV ORIGIN=${ORIGIN}
ENV ACCESS_TOKEN=${ACCESS_TOKEN}

#Exposing port to use it 
RUN echo "exposed port at ${PORT}"
EXPOSE ${PORT}

CMD ["ts-node", "index.ts"]

