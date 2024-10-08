const express = require("express");
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { Materiales,Comentarios } = require("../BaseDeDatos/BD");

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
routerMaterial.get("/getComentartioPadre/:material_iden", async (req, res) => {
    try {
        const material_iden = req.params.material_iden;
        const comentarios = await Comentarios.findAll({
            where: { material_iden: material_iden , comentario_padre:null}
        });
        if (comentarios.length > 0) {
            res.json(comentarios);
        } else {
            res.status(404).json({ error: 'No se encontraron comentarios para la sección proporcionada' });
        }
        //res.json(seccion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los temas' });
    }
});
routerMaterial.get("/getComentartioHijos/:material_iden/:comentario_padre", async (req, res) => {
    try {
        const material_iden = req.params.material_iden;
        const comentario_padre = req.params.comentario_padre;
        const comentarios = await Comentarios.findAll({
            where: { material_iden: material_iden , comentario_padre:comentario_padre}
        });
        if (comentarios.length > 0) {
            res.json(comentarios);
        } else {
            res.status(404).json({ error: 'No se encontraron comentarios para la sección proporcionada' });
        }
        //res.json(seccion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los temas' });
    }
});
routerMaterial.post("/createComentario", async (req, res) => {
    try {
        const { usuario,materia_iden,cuerpo, comentario_padre } = req.body;
        var payload;
        const recurso = req.file.path;
        if (!usuario || !materia_iden || !cuerpo || !comentario_padre) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const materia_idenint=parseInt(materia_iden.replace(/'/g, ''), 10);
        try {
            payload = jwt.verify(usuario, process.env.JWT_SECRET);
          
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Sesion expirada' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Sesion inválido' });
            }
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        const usuario_iden=payload.usuario.usuario_iden;
        const nuevaComentario = await Comentarios.create({
            usuario_iden:usuario_iden,
            materia_iden:materia_idenint,
            cuerpo:cuerpo,
            comentario_padre:comentario_padre
          });
          res.json(nuevaComentario);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear la sección' });
    }
    });
routerMaterial.get("/getMateriales/:seccion_iden", async (req, res) => {
    try {
        const seccion_iden = req.params.seccion_iden;
        const materiales = await Materiales.findAll({
            where: { seccion_iden: seccion_iden }
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
  cb(null, 'uploads');
},
filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname);
}
});

const upload = multer({ storage: storage });
routerMaterial.post("/createMaterial",upload.single('archivo'), async (req, res) => {
try {
    const { usuario,seccion_iden,nombre, descripcion } = req.body;
    var payload;
    const recurso = req.file.path;
    if (!usuario || !seccion_iden || !recurso || !nombre || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const seccion_idenint=parseInt(seccion_iden.replace(/'/g, ''), 10);
    try {
        payload = jwt.verify(usuario, process.env.JWT_SECRET);
      
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Sesion expirada' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Sesion inválido' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const usuario_iden=payload.usuario.usuario_iden;
    const nuevaMaterial = await Materiales.create({
        usuario_iden:usuario_iden,
        seccion_iden:seccion_idenint,
        nombre:nombre,
        descripcion:descripcion,
        ubicacion_backend:recurso
      });
  
      res.json(nuevaMaterial);

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la sección' });
}
});

 module.exports= routerMaterial;