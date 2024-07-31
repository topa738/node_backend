const sequelize = require('./ConexionPostgresSQL');
const Sistema = require('./tablas/Sistema');
const Usuario = require('./tablas/Usuarios');
const Materiales = require('./tablas/Materiales');
const Temas = require('./tablas/Temas');
const Seccion = require('./tablas/Seccion');
const Comentarios = require('./tablas/Comentarios');

// Definir relaciones
Usuario.belongsTo(Sistema, { foreignKey: 'sisema_iden' });
Materiales.belongsTo(Usuario, { foreignKey: 'usuario_iden' });
Materiales.belongsTo(Seccion, { foreignKey: 'seccion_iden' });
Seccion.belongsTo(Temas, { foreignKey: 'temas_iden' });
Comentarios.belongsTo(Usuario, { foreignKey: 'usuario_iden' });
Comentarios.belongsTo(Materiales, { foreignKey: 'material_iden' });
Comentarios.belongsTo(Comentarios, { foreignKey: 'comentario_padre' });

// Exportar sequelize y los modelos
module.exports = {
  sequelize,
  Sistema,
  Usuario,
  Materiales,
  Temas,
  Seccion
};
