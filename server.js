const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');

// Configurar CORS para permitir todas las solicitudes
app.use(cors());

require('dotenv').config();

const multer = require('multer');
const fs = require('fs');

const { sequelize, Sistema, Temporales, Usuario, Materiales, Temas, Seccion } = require('./BaseDeDatos/BD');
app.use(bodyParser.json());
const routerMaterial = require("./endpoint/material");
const routerTemas = require("./endpoint/temas");
const routerSeccion = require("./endpoint/seccion");
const routerUsuario = require("./endpoint/usuarios");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');

    await sequelize.sync(); // Esto sincroniza todos los modelos
   // console.log("Tablas creadas exitosamente");

    // Crear un registro de ejemplo en la tabla sistema
    //await Sistema.create({ email: "no asignado", contrasenia: "no asignado" });

    app.use('/Material', routerMaterial);
    app.use('/Temas',routerTemas);
    app.use('/Seccion',routerSeccion);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use('/Usuarios',routerUsuario);


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


    app.listen(8080, () => console.log("Server start"));
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
  }
};

startServer();
