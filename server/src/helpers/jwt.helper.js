const jwt = require('jsonwebtoken')

var generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {


        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife
            },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        )
    })
}

var verifyToken = (token, secretKey) => {
    return new Promise ((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}