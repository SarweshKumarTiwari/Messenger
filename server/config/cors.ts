import cors from 'cors'

//initialized cors
export default cors({
    credentials:true,
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:['Content-Type','Authorization',"Accept"]
});