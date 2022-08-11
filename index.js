const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const routes = require('./routes')
const apiRoutes = require('./api')
const flash = require("express-flash")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const helpers = require('./helpers/handlebars')
const cors = require('cors')
const AuthController = require('./controllers/api/AuthController')
const middlewareValidarJWT = require('./validarJwt')

require('dotenv').config()

app.use(express.static('public'))
app.engine('handlebars', engine({
    helpers: helpers,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    session({
        name: 'session',
        secret: '#@session@#',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            httpOnly: true,
            rolling: true
        },
    }),
)

app.use(function(req, res, next) {
    res.locals.session = req.session
    next()
})

app.use(flash())
app.use(cors())

app.use('/', routes)
app.post('/login', AuthController.login)

app.use('/api', middlewareValidarJWT, apiRoutes)

app.listen(8080, () => {
    console.log(`Servidor iniciado`)
})