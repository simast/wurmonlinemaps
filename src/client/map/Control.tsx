import React from 'react'
import ReactDOM from 'react-dom'
import Leaflet from 'leaflet'

interface ILeafletControl {
	new(options?: Leaflet.ControlOptions): Leaflet.Control
}

// Simple Leaflet control used as React portal target
const LeafletControl: ILeafletControl = Leaflet.Control.extend({

	onAdd(): HTMLElement {

		const container = document.createElement('div')

		Leaflet.DomEvent.disableClickPropagation(container)
		Leaflet.DomEvent.disableScrollPropagation(container)

		return container
	}
})

interface IProps {
	map?: Leaflet.Map
	position: Leaflet.ControlPosition
}

// React component that renders children content to Leaflet control container
export abstract class Control extends React.Component<IProps> {

	private leafletControl?: Leaflet.Control

	public render(): React.ReactNode {

		const {map, children} = this.props
		let {leafletControl} = this

		// Register a simple Leaflet control (as a component portal target)
		if (map && !leafletControl) {

			leafletControl = this.leafletControl = new LeafletControl({
				position: this.props.position
			})

			map.addControl(leafletControl)
		}

		if (!leafletControl) {
			return null
		}

		const container = leafletControl.getContainer()

		if (!container) {
			return null
		}

		return ReactDOM.createPortal(children, container)
	}
}
