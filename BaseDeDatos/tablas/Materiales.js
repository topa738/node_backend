const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Materiales = sequelize.define('Materiales', {
  material_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_iden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
  ,
  ubicacion_backend: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'materiales',
  timestamps: false
});

module.exports = Materiales;
