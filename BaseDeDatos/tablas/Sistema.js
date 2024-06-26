const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Sistema = sequelize.define('Sistema', {
  sisema_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'sistema',
  timestamps: false
});

module.exports = Sistema;
