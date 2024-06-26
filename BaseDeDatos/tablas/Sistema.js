const { DataTypes } = require('sequelize');
const sequelize = require('../ConexionPostgresSQL');

//sistema hace refernecia a los usuarios que si tienen contrasenia 
//y gmail, osea no son generado en el momento 
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
