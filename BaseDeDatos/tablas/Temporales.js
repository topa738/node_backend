const { DataTypes } = require('sequelize');
const sequelize = require('../PostgresSQL');

const Temporales = sequelize.define('Temporales', {
  temporal_iden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
}, {
  tableName: 'temporales',
  timestamps: false
});

module.exports = Temporales;
