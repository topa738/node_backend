
const express = require("express");
const codemodels=require('../Data/programacion')
const path = require('path');

const routerProgramacion=express.Router();


routerProgramacion.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


routerProgramacion.get("/",(req,res)=>{
    

// Ruta relativa al archivo que deseas enviar
const filePath = path.join(__dirname, '..', 'html', 'Programacion.html');

// Enviar el archivo
res.sendFile(filePath);
})
routerProgramacion.get("/files",(req,res)=>{
    codemodels.find({}, (err, docs) => {

        //res.setHeader('Content-Type',JSON.stringify(docs))
        res.end(JSON.stringify(docs));

    })
})
routerProgramacion.get("/descargar/:id",(req,res)=>{
    res.download('uploads/Programacion/'+req.params.id,req.params.id,
   
        function (error){
            if(error){
                console.log(error)
            }else{
                console.log('LISTO')
            }});
});
module.exports= routerProgramacion;