const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Materias = sequelize.define('Materias', {
  carreras_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  material_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'materias',
  timestamps: false
});

module.exports = Materias;
