const { User } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class AuthController {
    static async login(req, res) {
        try {

            const email = req.body.email
            const password = req.body.password
            const user = await User.findOne({ 
                where: {
                    email: email
                }
            })
        
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
            res.json(e.message)
        }
    }
}