
const express = require("express");
// const codemodels=require('../Data/programacion')
const path = require('path');

const routerProgramacion=express.Router();



routerProgramacion.get("/",(req,res)=>{
    

// Ruta relativa al archivo que deseas enviar
const filePath = path.join(__dirname, '..', 'html', 'Programacion.html');

// Enviar el archivo
res.sendFile(filePath);
})
// routerProgramacion.get("/files",(req,res)=>{
//     codemodels.find({}, (err, docs) => {

//         //res.setHeader('Content-Type',JSON.stringify(docs))
//         res.end(JSON.stringify(docs));

//     })
// })
// routerProgramacion.get("/descargar/:id",(req,res)=>{
//     res.download('uploads/Programacion/'+req.params.id,req.params.id,
   
//         function (error){
//             if(error){
//                 console.log(error)
//             }else{
//                 console.log('LISTO')
//             }});
// });

module.exports= routerProgramacion;