const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Carreras = sequelize.define('Carreras', {
  carreras_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'carreras',
  timestamps: false
});

module.exports = Carreras;
