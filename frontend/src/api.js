import axios from 'axios'
import uuidv1 from 'uuid/v1'

export default (method, endPoint, data = undefined) => {
	
	let token = window.localStorage.getItem('token') //eslint-disable-line

	if(!token) {
		token = uuidv1()
		window.localStorage.setItem('token', token) //eslint-disable-line
	}

	return axios({
		method,
		headers: {'Authorization': token},
		url: `http://localhost:3001/${endPoint}`,
		data
	})
		.then((response) => response.data)
}
