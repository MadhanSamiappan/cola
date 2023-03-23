const jwt = require('jsonwebtoken')

async function sign(data) {
    try {
        let token = await jwt.sign({name: "Cola"},process.env.JWT_SECRET)
        return token
    } catch (error) {
        console.log(error)
    }
}

async function validate(token) {
    try {
        let data = await jwt.verify(token,process.env.JWT_SECRET)
        return data
    } catch (error) {
        return false
    }
}

module.exports = {
    sign,
    validate
}