const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const routes = require('./routes')
const apiRoutes = require('./api')
const flash = require("express-flash")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const helpers = require('./helpers/handlebars')
const { User } = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

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
app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ 
        where: {
            email: email
        }
    })
    try {
        if (user) {
            if (await bcrypt.compareSync(password, user.password)) {
                jwt.sign({id: user.id}, '$chave$', (error, token) => {
                    res.status(200).json({
                        success: true,
                        token: token
                    })
                })
            } else {
                res.status(401).send()
            }
        } else {
            res.status(401).send()
        }
    } catch (e) {
        res.send(e.message)
    }
})

const middlewareValidarJWT = (req, res, next) => {
    const token = req.headers["authorization"]
    jwt.verify(token, "$chave$", (err, userInfo) => {
        if (err) {
            res.status(403).end()
            return
        }
        req.userInfo = userInfo
        next()
    });
};

app.use('/api', middlewareValidarJWT, apiRoutes)

app.listen(8080, () => {
    console.log(`Servidor iniciado`)
})