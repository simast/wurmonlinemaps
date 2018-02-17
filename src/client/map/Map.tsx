import React from 'react'
import Leaflet from 'leaflet'
import {autorun} from 'mobx'

import {STATIC_BASE_URL, MAP_TILE_SIZE} from '../../constants'
import {mapsByServer, getMaxMapZoom} from '../../maps'
import {mapStore} from './store'
import {SelectLayers} from './SelectLayers'

import 'leaflet/dist/leaflet.css'
import style from './Map.less'

// Map component wrapping a Leaflet map instance
export class Map extends React.Component {

	private mapElement: HTMLDivElement | null = null
	private map?: Leaflet.Map
	private tileLayer?: Leaflet.TileLayer

	public shouldComponentUpdate(): boolean {
		return false
	}

	public render(): React.ReactNode {

		return (
			<div className={style.container} ref={(el) => {this.mapElement = el}}>
				<SelectLayers map={this.map} position="topright" />
			</div>
		)
	}

	public componentDidMount(): void {

		this.createMap()
		this.forceUpdate()

		autorun(this.updateTileLayer.bind(this))
	}

	// Create Leaflet map instance
	private createMap(): void {

		const map = this.map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			maxBoundsViscosity: 0.5
		})

		// Disable right click context menu
		map.on('contextmenu', () => undefined)
	}

	// Update map tile layer based on map store state changes
	private updateTileLayer(): void {

		const {map} = this

		if (!map) {
			return
		}

		const {server, type, version} = mapStore
		let {tileLayer} = this

		// Remove old tile layer
		if (tileLayer) {
			tileLayer.remove()
		}

		if (!server || !type || !version) {
			return
		}

		const {size} = mapsByServer[server]
		const maxNativeZoom = getMaxMapZoom(size)
		const minMapZoom = Math.min(2, maxNativeZoom)

		const bounds = Leaflet.latLngBounds(
			map.unproject([0, size], maxNativeZoom),
			map.unproject([size, 0], maxNativeZoom)
		)

		// Create a new Leaflet TileLayer
		tileLayer = Leaflet.tileLayer(
			`${STATIC_BASE_URL}/${server}-${type}-${version}/{z}/{x}/{y}.{getExtension}`,
			{
				tileSize: MAP_TILE_SIZE,
				updateInterval: 50,
				noWrap: true,
				bounds,
				keepBuffer: 4,
				minNativeZoom: 0,
				maxNativeZoom,
				className: style.tileLayer,
				getExtension: ({z}: {z: number}) => (
					(z < maxNativeZoom)
						? 'jpg' // Lower zoom levels use lossy JPG format
						: 'png' // Higher zoom levels use lossless PNG format
				)
			}
		)

		map.setMaxBounds(bounds)
		map.setMinZoom(minMapZoom)
		map.setMaxZoom(maxNativeZoom + 2) // Allow over-zooming
		map.addLayer(tileLayer)
		map.fitWorld({animate: false})

		this.tileLayer = tileLayer
	}
}
