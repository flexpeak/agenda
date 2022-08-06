const { Pessoa } = require('../../models')

module.exports = class PessoaController {
    static async index(req, res) {
        try {
            const pessoas = await Pessoa.findAll({ include: 'enderecos' })
            res.status(200).json({
                success: true,
                data: pessoas
            })
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.message
            })
        }
    }

    static async show(req, res) {
        const pessoa = await Pessoa.findByPk(req.params.id, {
            include: 'telefones'
        })
        res.json(pessoa)
    }

    static async store(req, res) {
        const pessoa = await Pessoa.create({
            nome: req.body.nome,
            data_nascimento: req.body.data_nascimento,
            salario: req.body.salario,
            email: req.body.email
        })
        res.json(pessoa)
    }

    static async update(req, res) {
        const pessoa = await Pessoa.findByPk(req.params.id)
        await pessoa.update({
            nome: req.body.nome,
            data_nascimento: req.body.data_nascimento,
            salario: req.body.salario,
            email: req.body.email
        })
        res.json(pessoa)
    }

    static async destroy(req, res) {
        const pessoa = await Pessoa.findByPk(req.params.id)
        await pessoa.destroy()
        res.json(true)
    }
}