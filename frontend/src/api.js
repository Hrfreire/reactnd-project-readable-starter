import axios from 'axios'
import uuidv1 from 'uuid/v1'

export default (method, endPoint, data = undefined) => {
	
	let token = window.localStorage.getItem('token')

	if(!token) {
		token = uuidv1()
		window.localStorage.setItem('token', token)
	}

	return axios({
		method,
		headers: {'Authorization': token},
		url: `http://localhost:3001/${endPoint}`,
		data
	})
		.then((response) => response.data)
}
