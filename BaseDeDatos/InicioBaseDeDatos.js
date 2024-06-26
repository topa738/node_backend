const sequelize = require('./PostgresSQL');
const Sistema = require('./tablas/Sistema');
const Temporales = require('./tablas/Temporales');
const Usuario = require('./tablas/Usuarios');
const Materiales = require('./tablas/Materiales');
const Carreras = require('./tablas/Carreras');
const Materias = require('./tablas/Materias');

// Definir relaciones
Usuario.belongsTo(Sistema, { foreignKey: 'sisema_iden' });
Usuario.belongsTo(Temporales, { foreignKey: 'temporal_iden' });
Materiales.belongsTo(Usuario, { foreignKey: 'usuario_iden' });
Materias.belongsTo(Materiales, { foreignKey: 'material_iden' });
Materias.belongsTo(Carreras, { foreignKey: 'carreras_iden' });

// Exportar sequelize y los modelos
module.exports = {
  sequelize,
  Sistema,
  Temporales,
  Usuario,
  Materiales,
  Carreras,
  Materias
};
