const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT || 8080

require('./server')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./Routes'))
app.use(require('cors')())

app.get('/', (req, res) => res.send('Ok').status(200))

const server = http.createServer(app)

const io = socketIo(server)

function save(image, folder, image_name) {
	const fs = require('fs')
	const filename = __dirname + `/uploads/${folder}/${image_name}.jpg`

	if (!fs.existsSync(__dirname + `/uploads/${folder}`)) {
		fs.mkdirSync(__dirname + `/uploads/${folder}`, { recursive: true })
	}
	const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, '')

	fs.writeFileSync(filename, base64Data, { encoding: 'base64' })
}

// let interval
io.on('connection', (socket) => {
	console.log('New client connected')
	// if (interval) {
	// 	clearInterval(interval)
	// }
	socket.on('ImageByClient', (data) => {
		console.log(data['image'])
		// save(data['buffer'], data['username'], data['image_name'])
	})
	socket.on('disconnect', () => {
		console.log('Client disconnected')
	})
})

server.listen(port, () => console.log(`Listening on port ${port}`))
