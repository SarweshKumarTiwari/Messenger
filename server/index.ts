import express, { Application } from "express";
import dotenv from "dotenv";
import parser from "./config/parser"
import cookies from "./config/cookies";
import connectUsers from "./config/connectDB";
import routes from "./routes/auth.routes"
import cors from "./config/cors";

//accessing enviornment variable
dotenv.config();

//connecting database
connectUsers();

//initialised application
const app:Application=express();

//getting port from enviornment variable 
const Port:string=process.env.PORT || "80";

// allow Cors
app.use(cors);

// used Cookie-Parser
app.use(cookies);

//using json parser
app.use(parser);

// using different routes
app.use(routes);

//listening at port 4000
app.listen(Port,()=>console.log(`server running on port ${Port}`));