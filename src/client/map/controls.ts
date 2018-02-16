import React from 'react'
import ReactDOM from 'react-dom'
import Leaflet from 'leaflet'

import {SelectLayers} from './SelectLayers'

interface IControl {
	new(): Leaflet.Control
}

// Wrapped React SelectLayers component as Leaflet control
export const SelectLayersControl: IControl = Leaflet.Control.extend({

	onAdd(map: Leaflet.Map): HTMLElement {

		const container = document.createElement('div')

		ReactDOM.render(
			React.createElement(SelectLayers, {map}),
			container
		)

		return container
	}
})
