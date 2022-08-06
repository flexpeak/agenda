'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class telefone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pessoa, {
        as: 'pessoa'
      })
    }
  }
  telefone.init({
    numero: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'telefone',
  });
  return telefone;
};