const mongoose = require('mongoose')

const ImageSchema = require('./Image').Schema

const UserSchema = new mongoose.Schema({
	first: String,
	last: String,
	mobile: Number,
	email: {type:String,unique:true},
	dob: Date,
	gender: String,
	password:String,
	images: ImageSchema,
})

const User = mongoose.model('User', UserSchema, 'User')

module.exports = User
module.exports.Schema = UserSchema
