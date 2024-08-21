const { DataTypes } = require('sequelize');
const sequelize = require('../ConexionPostgresSQL');

const Comentarios = sequelize.define('Comentarios', {
  comentarios_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_iden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  material_iden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cuerpo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
  comentario_padre: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'comentarios'
});

module.exports = Comentarios;
