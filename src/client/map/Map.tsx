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

		const map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			minZoom: 2,
			maxZoom: 7, // Allow over-zooming
			zoom: 2,
			maxBoundsViscosity: 0.5
		})

		const southWest = map.unproject([0, 8192], 5)
		const northEast = map.unproject([8192, 0], 5)
		const maxBounds = Leaflet.latLngBounds(southWest, northEast)

		map.setMaxBounds(maxBounds)

		const baseTileLayer = Leaflet.tileLayer(
			'https://static.wurmonlinemaps.info/xanadu-terrain-256-2017-12/{z}/{x}/{y}.png',
			{
				tileSize: 256,
				minNativeZoom: 1,
				maxNativeZoom: 5,
				updateInterval: 100,
				noWrap: true,
				className: style.tileLayer,
				bounds: maxBounds,
				keepBuffer: 4
			}
		)

		baseTileLayer.addTo(map)

		map.on('contextmenu', () => undefined)

		map.fitWorld()
	}
}
