const jwt = require('jsonwebtoken');
const { Users } = require('../schemas/Users');
require('dotenv').config()

async function verifyToken(token) {
  try {
    if (!token) {
      return { statusToken: false, payloadToken: null }
    }
    const payloadToken = jwt.verify(token, process.env.KEY_TOKEN)
    if (typeof payloadToken !== 'string' && payloadToken.exp) {
      const expirationTime = payloadToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > expirationTime) {
        return { statusToken: false, payloadToken: null }
      }
    }
    if (typeof payloadToken !== 'string') {
      const res = await Users.findById(payloadToken._id).lean()
      if (payloadToken.password !== res?.password) {
        return { statusToken: false, payloadToken: null }
      }
    }
    return { statusToken: true, payloadToken }
  } catch (err) {
    return { statusToken: false, payloadToken: null }
  }
}

module.exports = { verifyToken }