
const express = require("express");
const {infoCursos} = require("../Data/cursos");

const routerProgramacion=express.Router();
//app.use('/cursos/programacion',routerProgramacion);



routerProgramacion.get("/:lenguaje",(req,res)=>{
    const lenguaje= req.params.lenguaje;
    const resultados=infoCursos.programacion.filter(curso=>curso.lenguaje===lenguaje);

    if(resultados.length===0){
        return res.status(404).end('No se a encontrado el curso de ')
    }
    if(req.query.ordenar==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=>a.vistas- b.vistas)))

    }
    res.send(JSON.stringify(resultados));
    //res.send("Todo Bien!");
})

routerProgramacion.get("/:lenguaje/:nivel",(req,res)=>{
    const lenguaje= req.params.lenguaje;
    const nivel= req.params.nivel;

    const resultados=infoCursos.programacion.filter(curso=>curso.lenguaje===lenguaje && curso.nivel===nivel);

    console.log(resultados)
    if(resultados.length===0){
        return res.status(404).end('No se a encontrado el curso de ')
    }

    res.send(JSON.stringify(resultados));
    //res.send("Todo Bien!");
})
module.exports= routerProgramacion;