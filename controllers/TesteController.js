const { Pessoa } = require('../models')
const { telefone } = require('../models')

module.exports = class TesteController {
    static async teste(req, res) {
        const pessoa = await Pessoa.findByPk(1, {
            include: [
                'telefones', 'enderecos'
            ]
        })

        const telefone1 = await telefone.findByPk(1, {
            include: 'pessoa'
        })

        res.send(pessoa)
    }
}