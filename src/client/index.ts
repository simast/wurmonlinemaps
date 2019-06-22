import React from 'react'
import ReactDOM from 'react-dom'
import {configure} from 'mobx'

// Enable required core-js polyfills
import 'core-js/features/object/values'
import 'core-js/features/array/includes'

import {Application} from './app'
import styles from './index.less'

// NOTE: Strict mode makes MobX require actions to modify state!
configure({enforceActions: 'observed'})

// Create main application container element
const createAppContainer = (): HTMLElement => {

	const appContainer = document.createElement('div')
	appContainer.className = styles.container!

	return document.body.appendChild(appContainer)
}

// Render application
ReactDOM.render(
	React.createElement(Application),
	createAppContainer()
)
