
const express = require("express");
// const codemodels=require('../Data/programacion')
const path = require('path');
const { sequelize, Sistema, Temporales, Usuario, Materiales, Temas, Seccion } = require('../BaseDeDatos/BD');


const endpointtemas=express.Router();



endpointtemas.get("/getTemas", async (req, res) => {
    try {
        const temas = await Temas.findAll();
        res.json(temas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los temas' });
    }
});
endpointtemas.post("/createTema", async (req, res) => {
    try {
        const { nombre, descripcion } = req.body; // Asegúrate de que los datos del cuerpo se envíen en la solicitud
        const nuevoTema = await Temas.create({ nombre, descripcion });
        res.status(201).json(nuevoTema); // Responder con el nuevo tema creado y un estado 201 (creado)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear el tema' });
    }
});
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
// Ruta relativa al archivo que deseas enviar
//const filePath = path.join(__dirname, '..', 'html', 'Programacion.html');

// Enviar el archivo
//res.sendFile(filePath);

module.exports= endpointtemas;