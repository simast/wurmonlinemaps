import React from 'react'
import ReactDOM from 'react-dom'

import {Application} from './app'

import styles from './index.css'

// Create main application container element
const createAppContainer = () => {

	const appContainer = document.createElement('div')
	appContainer.className = styles.container!

	return document.body.appendChild(appContainer)
}

// Render application
ReactDOM.render(
	<Application />,
	createAppContainer()
)
