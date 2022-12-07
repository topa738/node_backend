const express = require("express");
let infomaterial=JSON.parse(data)
const routermatematica=express.Router();

routermatematica.get('/',(req,res)=>
{
    res.send(JSON.stringify(infoCursos.matematicas));
});


routermatematica.get("/:tema",(req,res)=>{
    const tema= req.params.tema;
    console.log('tema')

    const resultados=infoCursos.matematicas.filter(curso=>curso.tema===tema);
    if(resultados.length===0){
        return res.status(404).end('No se a encontrado el curso de ')
    }
    res.send(JSON.stringify(resultados));

    //res.send("Todo Bien!");
})
module.exports = routermatematica;