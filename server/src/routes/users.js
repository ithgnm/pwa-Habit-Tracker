const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

const AuthMiddleware = require('../middleware/auth.middleware')
const AuthController = require('../controllers/auth.controller')

router.route('/add').post((req, res) => {

    if (req.body.password === req.body.confirmPassword) 
        bcrypt.hash(req.body.password, 12, (err, password) => {

            var user = new User()

            user.username = req.body.username
            user.email = req.body.email
            user.displayName = req.body.displayName
            user.password = password

            user.save()
                .then(() => res.send({ message: 'User added!' }))
                .catch(err => res.status(400).send(err))
        })

    else return res.send('Passwords not match!')
})

router.post('/login', AuthController.loginAccount)

router.post('/refresh-token', AuthController.refreshToken)

router.use(AuthMiddleware.isAuthenticated)

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).send(err))
})

module.exports = router