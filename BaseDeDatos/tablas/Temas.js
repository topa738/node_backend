const { DataTypes } = require('sequelize');
const sequelize = require('../ConexionPostgresSQL');

const Temas = sequelize.define('temas', {
  temas_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'temas',
  timestamps: false
});

module.exports = Temas;
