
const express = require("express");
const codemodels=require('../Data/programacion')

const routerProgramacion=express.Router();
//app.use('/cursos/programacion',routerProgramacion);


routerProgramacion.get("/",(req,res)=>{
    res.sendFile("/home/facu/unnobe/html/Programacion.html");
})
routerProgramacion.get("/files",(req,res)=>{
    codemodels.find({}, (err, docs) => {

        //res.setHeader('Content-Type',JSON.stringify(docs))
        res.end(JSON.stringify(docs));

    })
})
routerProgramacion.get("/descargar/:id",(req,res)=>{
    res.download('/home/facu/unnobe/uploads/Programacion/'+req.params.id,req.params.id,
        function (error){
            if(error){
                console.log(error)
            }else{
                console.log('LISTO')
            }});
});
module.exports= routerProgramacion;