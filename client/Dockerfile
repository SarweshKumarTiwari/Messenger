FROM node:16.20.0-alpine3.18 AS base

WORKDIR /app

RUN echo "Installing npm packages..."
COPY package*.json ./
RUN npm install
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

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/build /usr/share/nginx/html
EXPOSE 3000

CMD [ "nginx","-g","daemon off;" ]


