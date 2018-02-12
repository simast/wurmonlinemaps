import React from 'react'
import Leaflet from 'leaflet'

import {STATIC_BASE_URL} from '../../constants'

import 'leaflet/dist/leaflet.css'
import style from './Map.css'

// Map component wrapping a Leaflet map instance
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

		const maxMapZoom = 5
		const mapSize = 8192

		const map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			minZoom: 2,
			maxZoom: maxMapZoom + 2, // Allow over-zooming
			zoom: 2,
			maxBoundsViscosity: 0.5
		})

		const southWest = map.unproject([0, mapSize], maxMapZoom)
		const northEast = map.unproject([mapSize, 0], maxMapZoom)
		const maxBounds = Leaflet.latLngBounds(southWest, northEast)

		map.setMaxBounds(maxBounds)

		const baseTileLayer = Leaflet.tileLayer(
			`${STATIC_BASE_URL}/xanadu-terrain-2017-12-31/{z}/{x}/{y}.{getExtension}`,
			{
				tileSize: 256,
				updateInterval: 50,
				noWrap: true,
				bounds: maxBounds,
				keepBuffer: 4,
				minNativeZoom: 0,
				maxNativeZoom: maxMapZoom,
				className: style.baseTileLayer,
				getExtension: ({z}: {z: number}) => (
					(z < maxMapZoom)
						? 'jpg' // Lower zoom levels use lossy JPG format
						: 'png' // Higher zoom levels use lossless PNG format
				)
			}
		)

		baseTileLayer.addTo(map)

		map.on('contextmenu', () => undefined)

		map.fitWorld()
	}
}
