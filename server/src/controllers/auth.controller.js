const jwtHelper = require('../helpers/jwt.helper')
const bcrypt = require('bcrypt')
const debug = console.log.bind(console)

const User = require('../models/user.model')

var tokenList = {}

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

var loginAccount = (req, res) => {
    try {
        User.findOne({ username: req.body.username })
            .then(user => {
                bcrypt.compare(req.body.password, user.password)
                    .then(async result => {

                        if (result) {
                            
                            const userFakeData = {
                                _id: user._id,
                                username: user.username,
                                email: user.email
                            }

                            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
                            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
                            
                            tokenList[refreshToken] = { accessToken, refreshToken }

                            return res.status(200).send({ accessToken, refreshToken });
                        }

                        else res.status(400).send({ message: 'Wrong password!'})
                    })
                    .catch(err => res.status(400).send(err))
            })
            .catch(err => res.status(400).send(err))

    }
    catch (err) {
        return res.status(500).send(err)
    }
}

var refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken || req.query.refreshToken || req.headers["refresh-token"]

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret)
            const userFakeData = decoded.data

            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)

            return res.status(200).send({ accessToken })
        }
        catch (err) {
            debug(err)
            res.status(403).json({ message: 'Invalid refresh token.' })
        }
    }
    else return res.status(403).send({ message: 'No token provided.' })
}

module.exports = { 
    loginAccount: loginAccount,
    refreshToken: refreshToken
}