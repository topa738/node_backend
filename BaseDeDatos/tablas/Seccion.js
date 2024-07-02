const { DataTypes } = require('sequelize');
const sequelize = require('../ConexionPostgresSQL');

const Seccion = sequelize.define('Seccion', {
  seccion_iden: { //seccion pk
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  temas_iden: {//la seccion pertenece a un tema 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'seccion',
  timestamps: false
});

module.exports = Seccion;
