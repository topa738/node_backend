const express = require ('express')
const app=express();

app.get("/",(req,res)=>{
    res.send("Hola Mundo");
})
app.listen(8080,()=> console.log("Server start"));