const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    dirname:String,
    imagename:[String]
})
const Image = mongoose.model('Image', ImageSchema)

module.exports = Image
module.exports.Schema = ImageSchema