import React from 'react'
import ReactDOM from 'react-dom'
import {useStrict} from 'mobx'

// Enable required core-js polyfills
import 'core-js/fn/object/values'

import {Application} from './app'
import styles from './index.less'

// NOTE: Strict mode makes MobX require actions to modify state!
useStrict(true)

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
