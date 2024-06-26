const express = require('express');
const app = express();
require('dotenv').config();

const multer = require('multer');
const fs = require('fs');
const { sequelize, Sistema, Temporales, Usuario, Materiales, Carreras, Materias } = require('./BaseDeDatos/InicioBaseDeDatos');

const routerMaterial = require("./endpoint/material");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');

    await sequelize.sync({ force: true }); // Esto sincroniza todos los modelos
    console.log("Tablas creadas exitosamente");

    // Crear un registro de ejemplo en la tabla sistema
    await Sistema.create({ email: "no asignado", contrasenia: "no asignado" });

    app.use('/Material', routerMaterial);

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(typeof file.fieldname, 'por aca pasa');
        try {
          cb(null, `uploads/${file.fieldname}/`);
        } catch (error) {
          console.log('error', error);
        }
      },
      filename: function (req, file, cb) {
        cb("", file.originalname);
      }
    });

    const upload = multer({ storage: storage });

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/html/blog.html");
    });

    app.get("/blog.css", (req, res) => {
      res.sendFile(__dirname + "/css/blogstyle.css");
    });

    app.get("/iconos/:icono", (req, res) => {
      const icono = req.params.icono;
      res.sendFile(__dirname + "/iconos/" + icono);
    });

    app.get("/archivo.css", (req, res) => {
      res.sendFile(__dirname + "/css/archivosstyle.css");
    });

    app.get("/img.blog/:img", (req, res) => {
      const icono = req.params.img;
      res.sendFile(__dirname + "/img.blog/" + icono);
    });

    // POST
    app.post("/filesB", upload.single('Basicas'), (req, res) => {
      const date = new basicasmodel({
        nombre: req.body.Basicas[0],
        descripcion: req.body.Basicas[1],
        materia: req.body.Basicas[2],
        ruta: 'uploads/Programacion/' + req.file.originalname,
        tipo: 'programacion',
        nombrearchivo: req.file.originalname
      });
      date.save().then(() => console.log('LISTO'));
      res.send("Archivo cargado ");
    });

    app.post("/files", upload.single('Programacion'), (req, res) => {
      const date = new codemodel({
        nombre: req.body.Programacion[0],
        descripcion: req.body.Programacion[1],
        materia: req.body.Programacion[2],
        ruta: 'uploads/Programacion/' + req.file.originalname,
        tipo: 'programacion',
        nombrearchivo: req.file.originalname
      });
      console.log(date);
      date.save().then(() => console.log('LISTO'));
      res.send("Archivo cargado ");
    });

    app.listen(8080, () => console.log("Server start"));
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
  }
};

startServer();
