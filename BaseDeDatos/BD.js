const sequelize = require('./ConexionPostgresSQL');
const Sistema = require('./tablas/Sistema');
const Temporales = require('./tablas/Temporales');
const Usuario = require('./tablas/Usuarios');
const Materiales = require('./tablas/Materiales');
const Temas = require('./tablas/Temas');
const Seccion = require('./tablas/Seccion');

// Definir relaciones
Usuario.belongsTo(Sistema, { foreignKey: 'sisema_iden' });
Usuario.belongsTo(Temporales, { foreignKey: 'temporal_iden' });
Materiales.belongsTo(Usuario, { foreignKey: 'usuario_iden' });
Materiales.belongsTo(Seccion, { foreignKey: 'seccion_iden' });
Seccion.belongsTo(Temas, { foreignKey: 'temas_iden' });


// Exportar sequelize y los modelos
module.exports = {
  sequelize,
  Sistema,
  Temporales,
  Usuario,
  Materiales,
  Temas,
  Seccion
};
