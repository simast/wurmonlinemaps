import Leaflet from 'leaflet'

interface IControl {
	new(options?: Leaflet.ControlOptions): Leaflet.Control
}

// Simple Leaflet control used as React portal target
const Control: IControl = Leaflet.Control.extend({

	onAdd(): HTMLElement {
		return document.createElement('div')
	}
})

export const SelectLayersControl = new Control({position: 'topright'})
