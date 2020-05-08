const jwt = require('jsonwebtoken')

const tokenize = async (payload, time = '1 days') => {
	try {
		const token = await jwt.sign(payload, process.env.secret, {
			expiresIn: time,
		})

		return token
	} catch (error) {
		console.error(error)
	}
}

const verify = async (token) => {
	try {
		const decoded = await jwt.verify(token, process.env.secret)
		return decoded
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return { exp: 0 }
		}
		console.error(error)
	}
}

module.exports = { tokenize: tokenize, verify: verify }
