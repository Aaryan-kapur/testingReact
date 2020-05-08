import React, { Component, Fragment } from 'react'
import Peer from 'peerjs'

class Test extends Component {
	constructor() {
		super()

		this.state = { id: require('uuid').v4() }

		this.connect = this.connect.bind(this)
		// this.receive = this.receive.bind(this)
		// this.create = this.create.bind(this)
		// this.call = this.call.bind(this)
		this.stream = this.stream.bind(this)
	}

	// create() {
	// 	const peer = new Peer(this.state.id)
	// 	console.log(peer.id)
	// 	this.setState({ peer: peer })
	// }

	connect() {
		const conn = this.state.peer.connect(this.state.conn_id)
		conn.on('error', (err) => console.log(err))
		conn.on('open', function () {
			conn.send('hi!')
		})
	}

	stream() {
		const call = this.state.peer.call(this.state.conn_id, this.state.local)

		call.on('stream', (stream) => {
			this.setState({ remote: stream })

			const video = document.querySelector('video#remote')
			video.srcObject = stream

			video.onloadedmetadata = (e) => {
				video.play()
			}
		})
	}
	// receive() {
	// 	const recv = new Peer(this.state.conn_id)
	// 	recv.on('connection', function (conn) {
	// 		conn.on('data', function (data) {
	// 			console.log(data)
	// 		})
	// 		conn.on('error', (error) => console.log(error))
	// 	})

	// 	recv.on('call', (call) => {
	// 		console.log('receive')
	// 		// const { Readable } = require('stream')

	// 		// const readable = Readable.from('input string')

	// 		call.answer() // Answer the call with an A/V stream.
	// 		call.on('stream', function (remoteStream) {
	// 			console.log(remoteStream)
	// 			// Show stream in some video/canvas element.
	// 			const video = document.querySelector('video')
	// 			video.onloadedmetadata = function (e) {
	// 				video.srcObject = remoteStream
	// 				video.play()
	// 			}
	// 		})
	// 	})

	// 	// var call = this.state.peer.call(this.state.conn_id, stream)
	// }

	// streaming(stream) {
	// 	console.log(this.state)
	// 	var call = this.state.peer.call(this.state.conn_id, stream)

	// 	call.on('stream', function (remoteStream) {
	// 		// Show stream in some video/canvas element.
	// 		console.log(remoteStream)
	// 	})
	// }
	// call() {
	// 	const getUserMedia =
	// 		navigator.getUserMedia ||
	// 		navigator.webkitGetUserMedia ||
	// 		navigator.mozGetUserMedia
	// 	getUserMedia(
	// 		{ video: true, audio: true },
	// 		(stream) => this.streaming(stream),

	// 		function (err) {
	// 			console.log('Failed to get local stream', err)
	// 		}
	// 	)
	// }
	componentDidMount() {
		navigator.getWebcam =
			navigator.getUserMedia ||
			navigator.webKitGetUserMedia ||
			navigator.moxGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia

		const getUserMedia = navigator.mediaDevices.getUserMedia
		if (getUserMedia)
			getUserMedia({ video: { facingMode: 'user' }, audio: true }).then(
				(stream) => {
					this.setState({ local: stream })

					const video = document.querySelector('video#local')

					video.srcObject = stream

					video.onloadedmetadata = (e) => {
						video.play()
					}
				}
			)

		const peer = new Peer(this.state.id, {
			host: '42168f3c.ngrok.io',
			// port: 9000,
			path: '/myapp',
			secure: true,
		})
		this.setState({ peer: peer })

		peer.on('open', () => {
			console.log('open')
		})
		peer.on('connection', (conn) => {
			conn.on('data', (data) => {
				console.log(data)
			})
			conn.on('error', (err) => console.log(err))
			conn.on('open', () => console.log('conn open'))
			conn.on('close', () => console.log('conn closed'))
		})

		peer.on('call', (call) => {
			call.answer(this.state.local)
			call.on('stream', (stream) => {
				this.setState({ remote: stream })

				const video = document.querySelector('video#remote')
				video.srcObject = stream

				video.onloadedmetadata = (e) => {
					video.play()
				}
			})
		})
		// const id = prompt('Your Id')
		//
		// this.setState({ id: id, peer: peer })
	}

	render() {
		return (
			<Fragment>
				{this.state.id}
				<div className=''>
					<video
						muted
						style={{ transform: 'scaleX(-1)' }}
						id='local'
						src=''
					></video>
				</div>
				<div>
					<input
						type='text'
						name='conn_id'
						onChange={(e) =>
							this.setState({ [e.target.name]: e.target.value })
						}
					/>
					<input
						type='submit'
						className='btn'
						value='connect'
						onClick={(e) => {
							this.connect()
						}}
					/>
				</div>
				<div className=''>
					<input
						type='button'
						className='btn'
						value='stream'
						onClick={() => this.stream()}
					/>
				</div>
				<div className=''>
					<video id='remote' src=''></video>
				</div>

				{/* <div>
					<input
						type='text'
						name='id'
						onChange={(e) =>
							this.setState({ [e.target.name]: e.target.value })
						}
					/>
					<input
						type='submit'
						className='btn'
						value='create'
						onClick={(e) => {
							this.create()
						}}
					/>
				</div>


				<input
					type='submit'
					className='btn'
					value='receive'
					onClick={(e) => {
						this.receive()
					}}
				/>
				<input onClick={() => this.call()} type='submit' calue='call' /> */}
			</Fragment>
		)
	}
}
export default Test
