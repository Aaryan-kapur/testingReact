import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Register from './Register/'

import '../styles/App.scss'
import Test from './Test'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			response: false,
			endpoint: 'http://127.0.0.1:8080',
			screenshot: null,
			image_name: 0,
			username: 'Aniket',
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
			<Router>
				<Switch>
					<Route path='/' exact>
						<Register></Register>
					</Route>
					<Route path='/login'>hola</Route>
					<Route path='/test'>
						<Test></Test>
					</Route>
				</Switch>
			</Router>
		)
	}
}
