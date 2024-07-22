
const express = require("express");
// const codemodels=require('../Data/programacion')
const path = require('path');
const multer = require('multer');
const { sequelize, Sistema, Temporales, Usuario, Materiales, Temas, Seccion } = require('../BaseDeDatos/BD');

const endpointseccion=express.Router();



    endpointseccion.get("/getSeccion/:temas_iden", async (req, res) => {
        try {
            const temaId = req.params.temas_iden;
            const seccion = await Seccion.findAll({
                where: { temas_iden: temaId }
            });
            if (seccion.length > 0) {
                res.json(seccion);
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
endpointseccion.post("/createSeccion",upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, descripcion, color, temas_iden } = req.body;
        
        const imagen = req.file.path;
        if (!temas_iden || !nombre || !imagen || !descripcion || !color) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const nuevaSeccion = await Seccion.create({
            nombre,
            descripcion,
            color,
            temas_iden,
            imagen
          });
      
          res.json(nuevaSeccion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear la sección' });
    }
});

module.exports= endpointseccion;