const express = require("express");

const { register, login ,queUsuario} = require('../servicios/ServiciosUsuarios');

const endpointUsuario = express.Router();

endpointUsuario.post('/register', register);
endpointUsuario.post('/login', login);

endpointUsuario.post('/queUsuario', queUsuario);

module.exports = endpointUsuario;




