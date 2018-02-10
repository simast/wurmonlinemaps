import React from 'react'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'
import style from './Map.css'

// Map component wrapping a Mapbox GL map
export class Map extends React.PureComponent {

	private mapElement: HTMLDivElement | null = null

	public render(): React.ReactNode {

		return (
			<div
				className={style.base}
				ref={(element) => {this.mapElement = element}}
			/>
		)
	}

	public componentDidMount() {

		const maxBounds = Leaflet.latLngBounds([[85, 180], [-85, -180]])

		const map = Leaflet.map(this.mapElement!, {
			attributionControl: false,
			zoomControl: false,
			minZoom: 2,
			maxZoom: 8,
			maxBounds,
			maxBoundsViscosity: 0.5
		})

		map.on('contextmenu', () => undefined)

		const tileLayer = Leaflet.tileLayer(
			'https://s3-eu-west-1.amazonaws.com/wurmonlinemaps/xanadu-terrain-20171231/{z}/{x}/{y}.png',
			{
				tms: true,
				minNativeZoom: 1,
				maxNativeZoom: 5,
				updateInterval: 100,
				noWrap: true,
				className: style.tileLayer,
				bounds: maxBounds
			}
		)

		tileLayer.addTo(map)

		map.fitWorld()
	}
}
