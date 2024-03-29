const express = require("express");
const routerbasicas=express.Router();
const path = require('path');
const models=require('../Data/bascias.js')

routerbasicas.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


routerbasicas.get("/",(req,res)=>{
const filePath = path.join(__dirname, '..', 'html', 'Basicas.html');

// Enviar el archivo
res.sendFile(filePath);
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
    res.download('uploads/Basicas/'+req.params.id,req.params.id,
        function (err){
            if(err){
                console.log(err)
            }else{
                console.log('LISTO')
            }
        });
});
module.exports = routerbasicas;