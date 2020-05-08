const Helper = require('.')
require('dotenv').config({ path: __dirname + '/../.env' })

const Hash = Helper.Hash
const JWT = Helper.JWT

const assert = require('assert')

const HashTest = async () => {
	try {
		console.log(`Running HashTest`)

		const pass = 'ehllo'
		const hashed = await Hash.encrypt(pass)
		const result = await Hash.compare(pass, hashed)
		assert(result)
	} catch (error) {
		console.log('HashTest Failed')
		console.error(error)
	}
}

const JWTTest = async () => {
	console.log(`Running JWTTest`)
	try {
		async function basic() {
			try {
				const payload = { foo: 'bar' }
				const token = await JWT.tokenize(payload)
				const decode = await JWT.verify(token)
				assert(decode.foo === 'bar' && decode.exp>0)
			} catch (error) {
				console.log(error)
			}
		}

		async function expires() {
			try {
				const payload = { foo: 'bar' }
				const token = await JWT.tokenize(payload, '1')
				const decode = await JWT.verify(token)
				assert(decode.exp===0)
			} catch (error) {
				console.log(error)
			}
		}

		basic()
		expires()
	} catch (error) {
		console.log(`JWTTest failed`)
		console.error(error)
	}
}

const Test = async () => {
	HashTest()
	JWTTest()
}

Test()
