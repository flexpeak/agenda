const { Pessoa } = require('../models')
class PessoaController {
    static async index(req, res) {
        const pessoas = await Pessoa.findAll({ include: 'telefones' })
        console.log(pessoas[0].telefones)
        res.render('pessoa/index', {
            pessoas: pessoas
        })
    }

    static create(req, res) {
        res.render('pessoa/create')
    }

    static async store(req, res) {
        await Pessoa.create({
            nome: req.body.nome,
            email: req.body.email,
            data_nascimento: req.body.data_nascimento,
            salario: req.body.salario
        })

        req.flash('success', 'Registro criado com sucesso!')
        req.session.save(() => {
            res.redirect('/pessoa')
        })
    }

    static async edit(req, res) {
        const pessoa = await Pessoa.findByPk(req.params.id, {include: 'telefones'})

        res.render('pessoa/edit', {
            pessoa: pessoa
        })
    }

    static async update(req, res) {
        try {
            const pessoa = await Pessoa.findByPk(req.params.id)
            await pessoa.update({
                nome: req.body.nome,
                email: req.body.email,
                data_nascimento: req.body.data_nascimento,
                salario: req.body.salario
            })
    
            req.flash('success', 'Registro atualizado com sucesso!')
            req.session.save(() => {
                res.redirect('/pessoa')
            })
        } catch (e) {
            console.log(e)
        }
    }

    static async destroy(req, res) {
        const pessoa = await Pessoa.findByPk(req.params.id)
        await pessoa.destroy()

        req.flash('success', 'Registro excluido com sucesso!')
            req.session.save(() => {
                res.redirect('/pessoa')
            })
    }
}

module.exports = PessoaController