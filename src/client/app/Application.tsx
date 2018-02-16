import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import {Map} from '../map'

export const Application: React.StatelessComponent = () => (
	<BrowserRouter>
		<Map />
	</BrowserRouter>
)
