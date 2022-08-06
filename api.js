const { Router } = require('express')
const PessoaController = require('./controllers/api/PessoaController')
const router = Router()

router.get('/pessoas', PessoaController.index)
router.get('/pessoas/:id', PessoaController.show)
router.post('/pessoas', PessoaController.store)
router.put('/pessoas/:id', PessoaController.update)
router.delete('/pessoas/:id', PessoaController.destroy)

router.use(function (req, res, next) {
    res.status(404).json({
        error: true,
        message: 'Rota não existe'
    })
})

module.exports = router