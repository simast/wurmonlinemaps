import React from 'react'
import ReactDOM from 'react-dom'
import Leaflet from 'leaflet'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './Control.less'

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

export interface IControlProps {
	expanded: boolean
}

interface IProps {
	map?: Leaflet.Map
	position: Leaflet.ControlPosition
	expandable?: boolean
	component: React.ComponentType<IControlProps>
}

// React component used as a wrapper for Leaflet control
@observer export class Control extends React.Component<IProps> {

	@observable private expanded = false
	private leafletControl?: Leaflet.Control

	// Render control
	public render(): React.ReactNode {

		const {map, component, expandable} = this.props

		if (map) {
			this.registerLeafletControl(map)
		}

		const {leafletControl, expanded} = this

		if (!leafletControl) {
			return null
		}

		const container = leafletControl.getContainer()

		if (!container) {
			return null
		}

		container.className = classNames(
			'leaflet-control',
			expandable ? (expanded ? styles.expanded : styles.expandable) : styles.base
		)

		const props: IControlProps = {
			expanded
		}

		return ReactDOM.createPortal(
			React.createElement(component, props),
			container
		)
	}

	// Register a simple Leaflet control (as a component portal target)
	private registerLeafletControl(map: Leaflet.Map) {

		let {leafletControl} = this

		if (leafletControl) {
			return
		}

		const {
			position,
			expandable = false
		} = this.props

		leafletControl = new LeafletControl({position})

		map.addControl(leafletControl)

		const controlContainer = leafletControl.getContainer()
		const mapContainer = map.getContainer()

		if (expandable && controlContainer) {

			Leaflet.DomEvent.on(controlContainer, 'click', this.handleClick)
			Leaflet.DomEvent.on(mapContainer, 'mousedown touchstart', this.handleMapInteraction)
			map.on('mousedown keypress', this.handleMapInteraction)
		}

		this.leafletControl = leafletControl
	}

	// Expand control view
	@action private expand(): void {

		if (!this.expanded) {
			this.expanded = true
		}
	}

	// Collapse control view
	@action private collapse(): void {

		if (this.expanded) {
			this.expanded = false
		}
	}

	// Handle click event
	private handleClick: Leaflet.DomEvent.EventHandlerFn = () => {
		this.expand()
	}

	// Handle map interaction events
	private handleMapInteraction: Leaflet.LeafletEventHandlerFn = () => {
		this.collapse()
	}
}
