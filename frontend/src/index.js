import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles.css'
import App from './components/App'
import configureStore from './store/configureStore'
import 'antd/dist/antd.css'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'))