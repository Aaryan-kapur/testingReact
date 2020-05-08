const bcrypt = require('bcrypt')

const salt = 10

const encrypt = async (plain_text) => {
	try {
		const encrypted = await bcrypt.hash(plain_text, salt)
		return encrypted
	} catch (error) {
		console.log(error)
	}
}

const compare = async (plain_text, hash) => {
	try {
		const result = await bcrypt.compare(plain_text, hash)
		return result
	} catch (error) {
		console.log(error)
	}
}

module.exports = { encrypt: encrypt, compare: compare }
