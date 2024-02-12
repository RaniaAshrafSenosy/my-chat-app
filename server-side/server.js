const exp = require("constants");
const express=require("express");
const path=require("path");
const app=express();
const server=require("http").createServer(app);
const PORT= process.env.PORT||7005;
// const bodyParser=require("body-parser");
// //#endregion
// //#region middleware
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// //#endregion
// //#region get
app.use(express.static(path.join(__dirname,"../public/pages")));
app.use(express.static(path.join(__dirname,"../public/style")));
app.get("/style/index.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/style/index.css"))
  });
  app.get("/style/all.min.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/style/all.min.css"))
  });
  app.get("/style/bootstrap.min.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/style/bootstrap.min.css"))
  });
  app.get("/font/Poppins-Regular.ttf",(req,res)=>{
    res.sendFile(path.join(__dirname,"../font/Poppins-Regular.ttf"))
  });
  app.get("/js/index.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/js/index.js"))
  });
  const io=require("socket.io")(server);
  io.on("connection",function(socket){
    socket.on("newuser",function(username){
       socket.broadcast.emit("update",username+"joined the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username+"left the conversation");
     });
     socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
     });

  });
server.listen(PORT);