const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).send(err))
});

router.route('/add').post((req, res) => {

    const username = req.body.username

    if (req.body.password === req.body.confirmPassword) 
        bcrypt.hash(req.body.password, 12, (err, password) => {

            var user = new User({ username, password })

            user.save()
                .then(() => res.send('User added!'))
                .catch(err => res.status(400).send(err))
        })

    else return res.send('Passwords not match!')
});

module.exports = router