const express = require("express");
const codemodels=require('../Data/programacion')
const path = require('path');

const routerProgramacion=express.Router();

const express = require('express');
const { register, login } = require('../servicios/ServiciosUsuarios');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;




