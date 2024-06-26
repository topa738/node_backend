const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Usuarios = sequelize.define('Usuario', {
  usuario_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombredeusuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temporal_iden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sisema_iden: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuarios;
