import app from "./app/app.js";
import http from'http'



//creating the server
const PORT = process.env.PORT||4300
const server=http.createServer(app)
server.listen (PORT,(err)=>{
    err?console.log(err):console.log(`server running on ${PORT}`)
})