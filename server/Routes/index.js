const express = require('express')
const app = express.Router()

const Helper = require('../Helper')
const User = require('../Schemas/').User

app.post('/register', async (req, res) => {
	try {
		req.body.password = await Helper.Hash.encrypt(req.body.password)

		const data = await new User(req.body).save()

		const auth = await Helper.JWT.tokenize({ user: data._id })

		res.json({ auth: auth, success: true })
	} catch (error) {
		if (error.name === 'MongoError') {
			if (error.code === 11000) {
				res.send('Username Exists').status(402)
			}
		} else res.sendStatus(500)
	}
})

app.post('/login', async (req, res) => {
	try {
		const data = await User.findOne({ email: req.body.email })

		const verify = await Helper.Hash.compare(
			req.body.password,
			data.password
		)

		if (verify === true) {
			const auth = await Helper.JWT.tokenize({ user: data._id })
			res.send({ auth: auth, success: true })
		} else {
			res.json({ success: false }).status(401)
		}
	} catch (error) {
		res.send(500)
	}
})

async function verify(req, res, next) {
	try {
		const auth = req.get('Authorization')
		if (auth) {
			const decoded = await Helper.JWT.verify(auth)
			req.body.decoded = decoded
			next()
		}
	} catch (error) {
		res.sendStatus(500)
	}
}
app.post('/verify', verify, async (req, res) => {
	res.json({ user: req.body.decoded.user })
})

module.exports = app
