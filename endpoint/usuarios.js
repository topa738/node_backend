const express = require("express");

const { register, login } = require('../servicios/ServiciosUsuarios');

const endpointUsuario = express.Router();

endpointUsuario.post('/register', register);
endpointUsuario.post('/login', login);

module.exports = endpointUsuario;




