const jwtHelper = require('../helpers/jwt.helper')
const debug = console.log.bind(console)

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

var isAuthenticated = async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["access-token"]

    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret)
            req.jwtDecoded = decoded
            next()

        } catch (err) {
            debug('Error while verify token:', err)
            return res.status(401).send({ message: 'Unauthorized.' })
        }
    } 
    else {
        return res.status(403).send({ message: 'No token provided.' })  
    }
}

module.exports = { isAuthenticated: isAuthenticated }