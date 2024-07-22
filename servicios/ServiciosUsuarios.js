const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioDeSistema = require('../BaseDeDatos/tablas/Sistema')
const Usuario = require('../BaseDeDatos/tablas/Usuarios');

const nombres = ['Juan', 'María', 'Pedro', 'Ana'];
const apellidos = ['García', 'Rodríguez', 'Martínez', 'López'];

exports.register = async (req, res) => {
  const { nombre,apellido,email, password } = req.body;
  try {
    if( email && password){
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuariodesistema = await UsuarioDeSistema.create({ email:email, contrasenia: hashedPassword });
      const usuario = await Usuario.create({ nombredeusuario:nombre+"_"+apellido,sisema_iden:usuariodesistema.sisema_iden});
      const nuevoToken = jwt.sign(usuario,process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(201).json(nuevoToken);
    }else{
      const usuario = await Usuario.create({ nombredeusuario:generarNombreDeUsuario(),sisema_iden:1});
      const nuevoToken = jwt.sign({usuario},process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(201).json(nuevoToken);
    }
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

function generarNombreDeUsuario() {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  return `${nombre}_${apellido}`;
}



exports.login = async (req, res) => {
  const { nombredeusuario, password } = req.body;
  try {
    const user = await User.findOne({
      include: [
        {
          model: Sistema,
          required: true, // Cambiar a false si quieres resultados incluso si no hay coincidencia en la tabla Sistema
        }
      ],
      where: {
        nombredeusuario: nombredeusuario // Condición en la tabla Usuario
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24hs' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
