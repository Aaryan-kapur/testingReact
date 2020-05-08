require('../server')
const assert = require('assert')
const User = require('.').User

const UserModel = new User({
	first: 'Aniket',
	last: 'Chowdhury',
	mobile: '9660629107',
	email: 'ac2587@bennett.edu.in',
	dob: '08-09-1999',
	gender: 'Male',
	images:{dirname:'Aniket',imagename:['Aniket1.jpg','Aniket2.jpg','Aniket3.jpg']}
})

const test = async (Model) => {
	const data = await Model.save()
	const req_data = await User.findById(data._id).exec()

	assert(JSON.stringify(data) === JSON.stringify(req_data))
	
	const rem_data = await User.findByIdAndRemove(data._id)
	
	console.log(data,req_data)
    console.log(data._id, req_data._id,rem_data._id)
}

test(UserModel)
