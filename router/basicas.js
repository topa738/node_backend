const express = require("express");
const routerbasicas=express.Router();

const models=require('../Data/bascias.js')


routerbasicas.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile("/home/facu/unnobe/html/Basicas.html");
})
routerbasicas.get("/files",(req,res)=> {
    let data=undefined;
    models.find({}, (err, docs) => {
        data=JSON.stringify(docs);
        //res.setHeader('Content-Type',JSON.stringify(docs))
        res.end(JSON.stringify(docs));
    })
});


routerbasicas.get("/descargar/:id",(req,res)=>{
    res.download('/home/facu/unnobe/uploads/Basicas/'+req.params.id,req.params.id,
        function (err){
            if(err){
                console.log(err)
            }else{
                console.log('LISTO')
            }
        });
});
module.exports = routerbasicas;