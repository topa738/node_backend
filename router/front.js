const express = require("express");
const routerfront=express.Router();



routerfront.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile("/home/facu/Escritorio/node_backend/front_end.three.js/index.html");
})

//favicon.ico

module.exports = routerfront;