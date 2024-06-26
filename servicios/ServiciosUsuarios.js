const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioDeSistema = require('../BaseDeDatos/tablas/Sistema')
const Usuario = require('../BaseDeDatos/tablas/Usuarios');

exports.register = async (req, res) => {
  const { nombre,apellido,email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuariodesistema = await UsuarioDeSistema.create({ email:email, contrasenia: hashedPassword });
    const usuario = await Usuario.create({ nombredeusuario:nombre+"_"+apellido});
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
