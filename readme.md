# Messenger
In this project we setup a enviornment in which we chat with our friends and makes groups

# Intializing client page
## About

    This is a client  page in which i have react used following libraries
    1.React with Typescript
    2.React-query
    3.formik
    4.axios
    5.socket.io client
    6.yup

## Intialize for dev
    1.Go to client using "cd client"
    2.use "npm i" or "npm install" to install dependensies
    3.before starting client server start backend server
    4.first goto backend folder "cd.." then "cd server"
    5.now use "npm run dev"   
    6.use "npm start" 

## For Production
    1.now use 'npm build' in client 
    2.And use nginx for serving static files in build folder
# Intializing server
## About
    In this server I have used following libraries 
    1.express
    2.bcrypt
    3.socket.io
    4.jsonwebtoken
    5.mongoose
    6.validator
    7.dotenv
## Initialize
    1.got to server using "cd server"
    2.use "npm i" or "npm install" to install dependencies
    3.Initialize .env file
        3.1 Assign a variable "ACCESS_TOKEN" and give it some value
        3.2 Open ter minal and type "node" and enter
        3.3 now type " crypto.randomBytes(64).toString("hex")" and copy this value
        3.4 paste it to "ACCESS_TOKEN "

        3.5 now assign new "PORT=4000"

# Build docker images
## Initialize Dockerfiles in both folders
    1.Firstly install [docker](https://docs.docker.com/engine/install/) in your system
    2.Now initialize dockerfile in both folders 
    3.Then run following command ```bash bash
    docker build -t user_name:version .
    ```
## Use docker compose
    1.Install [docker-compose](https://docs.docker.com/compose/install/) in your system
    2.Initialize docker-compose.yml in root folder
    3.Then run following command on your root folder ```bash bash
    docker compose up
    ```

