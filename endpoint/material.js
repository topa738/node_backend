const express = require("express");
// const codemodels=require('../Data/programacion')

const path = require('path');
const multer = require('multer');
const { Materiales } = require("../BaseDeDatos/BD");

const routerMaterial=express.Router();



routerMaterial.get("/",(req,res)=>{
    

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
routerMaterial.get("/getMaterial/:seccion_iden", async (req, res) => {
    try {
        const Seccion_iden = req.params.temas_iden;
        const materiales = await Materiales.findAll({
            where: { seccion_iden: Seccion_iden }
        });
        if (materiales.length > 0) {
            res.json(materiales);
        } else {
            res.status(404).json({ error: 'No se encontraron temas para la sección proporcionada' });
        }
        //res.json(seccion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los temas' });
    }
});
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'uploads*/recursos/');
},
filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname);
}
});

const upload = multer({ storage: storage });
routerMaterial.post("/createMaterial",upload.single('recurso'), async (req, res) => {
try {
    const { usuario_iden,seccion_iden,tirulo, descripcion } = req.body;
    
    const recurso = req.file.path;
    if (!usuario_iden || !seccion_iden || !recurso || !tirulo || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevaMaterial = await Materiales.create({
        usuario_iden,
        seccion_iden,
        titulo,
        descripcion,
        ubicacion_backend
      });
  
      res.json(nuevaMaterial);

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la sección' });
}
});

module.exports= routerMaterial;