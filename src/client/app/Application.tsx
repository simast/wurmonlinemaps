import React from 'react'
import {Router, Route} from 'react-router-dom'

import {history} from './history'
import {Map} from '../map'
import {MAP_ROUTE} from '../../constants'

export const Application: React.StatelessComponent = () => (
	<Router history={history}>
		<Route path={MAP_ROUTE} component={Map} />
	</Router>
)
