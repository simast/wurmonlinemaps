import React from 'react'
import ReactDOM from 'react-dom'

// Enable required core-js polyfills
import 'core-js/fn/object/values'

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
	React.createElement(Application),
	createAppContainer()
)
