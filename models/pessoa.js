'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.telefone, {
        as: 'telefones',
      })

      this.belongsToMany(models.Endereco, {
        as: 'enderecos',
        through: 'PessoaEnderecos'
      })
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      get() {
        const valor = this.getDataValue('data_nascimento')
        if (valor) {
          return valor.split('-').reverse().join('/')
        } else {
          return null
        }
      },
      set(valor) {
        if (valor) {
          this.setDataValue('data_nascimento', valor.split('/').reverse().join('-'))
        } else {
          this.setDataValue('data_nascimento', null)
        }
      }
    },
    email: DataTypes.STRING(80),
    salario: {
      type: DataTypes.DECIMAL(10,2),
      set(valor) {
        if (valor) {
          this.setDataValue('salario', valor.replace('.', '').replace(',', '.'))
        } else {
          this.setDataValue('salario', null)
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Pessoa'
  });
  return Pessoa;
};