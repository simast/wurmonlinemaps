import React from 'react'
import ReactDOM from 'react-dom'
import Leaflet from 'leaflet'

interface ILeafletControl {
	new(options?: Leaflet.ControlOptions): Leaflet.Control
}

// Simple Leaflet control used as React portal target
const LeafletControl: ILeafletControl = Leaflet.Control.extend({

	onAdd(): HTMLElement {
		return document.createElement('div')
	}
})

interface IProps {
	map?: Leaflet.Map
	position: Leaflet.ControlPosition
}

// React component that renders to Leaflet control container
export abstract class Control extends React.Component<IProps> {

	private leafletControl?: Leaflet.Control

	public render(): React.ReactNode {

		let {leafletControl} = this
		const {map} = this.props

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

		return ReactDOM.createPortal(
			this.renderControl(),
			container
		)
	}

	// Actual render method for child classes
	protected abstract renderControl(): React.ReactNode
}
