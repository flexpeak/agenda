const { Router } = require('express')
const IndexController = require('./controllers/IndexController')
const PessoaController = require('./controllers/PessoaController')
const TesteController = require('./controllers/TesteController')
const router = Router()

router.get('/', IndexController.index)
router.get('/pessoa', PessoaController.index)
router.get('/pessoa/create', PessoaController.create)
router.post('/pessoa/store', PessoaController.store)
router.get('/pessoa/edit/:id', PessoaController.edit)
router.post('/pessoa/update/:id', PessoaController.update)
router.get('/pessoa/destroy/:id', PessoaController.destroy)

router.get('/teste', TesteController.teste)

module.exports = router