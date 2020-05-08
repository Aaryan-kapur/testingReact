import React, { Component } from 'react'
import Webcam from 'react-webcam'
import socketIOClient from 'socket.io-client'
class Face extends Component {
	constructor() {
		super()
		this.state = {
			response: false,
			endpoint: 'http://127.0.0.1:8080',
			screenshot: null,
			image_name: 0,
			username: 'Test',
			first: '',
			last: '',
			mobile: '',
			email: '',
			dob: '',
			gender: '',
		}
		this.screenshot = this.screenshot.bind(this)
	}

	screenshot() {
		const { endpoint } = this.state
		const socket = socketIOClient(endpoint)
		this.setState({ image_name: 0 })
		let interval = setInterval(() => {
			if (this.state.image_name === 49) {
				clearInterval(interval)
			}
			let image_name = this.state.image_name + 1
			let screenshot = this.refs.webcam.getScreenshot()
			this.setState(
				{ screenshot: screenshot, image_name: image_name },
				() =>
					socket.emit('ImageByClient', {
						image: true,
						buffer: this.state.screenshot,
						username: this.state.username,
						image_name: `${this.state.username}${this.state.image_name}`,
					})
			)
		}, 100)
	}
	onClickHandler = () => {
		const data = new FormData()
		data.append('file', this.state.selectedFile)
	}
	render() {
		return (
			<React.Fragment>
				<div className='title'>Register facial details</div>
				<div className='camera'>
					<Webcam audio={false} class='webcam' ref='webcam' />
					<br />{' '}
					<a
						href='#nada'
						class='button btn-hello btn-two'
						variant='contained'
						color='primary'
						onClick={(e) => {
							this.screenshot()
							e.preventDefault()
						}}
					>
						<span>Register Face</span>
					</a>
				</div>
			</React.Fragment>
		)
	}
}

export default Face
