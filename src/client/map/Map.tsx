import React from 'react'
import Leaflet from 'leaflet'
import {autorun} from 'mobx'

import {STATIC_BASE_URL, MAP_TILE_SIZE} from '../../constants'
import {mapsByServer, getMapMaxZoom} from '../../maps'
import {Server} from '../../server'
import {mapStore} from './store'
import {Control} from './Control'
import {SelectLayers} from './SelectLayers'

import 'leaflet/dist/leaflet.css'
import style from './Map.less'

// Component wrapping a Leaflet map instance
export class Map extends React.Component {

	private mapElement: HTMLDivElement | null = null
	private map?: Leaflet.Map
	private tileLayer?: Leaflet.TileLayer
	private server?: Server

	public shouldComponentUpdate(): boolean {
		return false
	}

	public render(): React.ReactNode {

		return (
			<div className={style.container} ref={(el) => {this.mapElement = el}}>
				<Control map={this.map} position="topright">
					<SelectLayers />
				</Control>
			</div>
		)
	}

	public componentDidMount(): void {

		this.createMap()
		this.forceUpdate()

		autorun(this.updateInteraction)
		autorun(this.updateTileLayer)
	}

	// Create Leaflet map instance
	private createMap(): void {

		const map = this.map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			maxBoundsViscosity: 0.5,
			preferCanvas: true
		})

		// Disable right click context menu
		map.on('contextmenu', () => undefined)
	}

	// Update map tile layer based on map store state changes
	private updateTileLayer = (): void => {

		const {map} = this

		if (!map) {
			return
		}

		const {server, type, version} = mapStore
		const isNewServer = server !== this.server
		let {tileLayer} = this

		// Remove old tile layer
		if (isNewServer && tileLayer) {

			tileLayer.remove()
			tileLayer = undefined
		}

		if (server && type && version) {

			const tileLayerUrl = `${STATIC_BASE_URL}/${server}-${type}-${version}/{z}/{x}/{y}.{getExtension}`

			// Re-use existing tile layer
			if (tileLayer) {
				tileLayer.setUrl(tileLayerUrl)
			}
			// Create a new tile layer
			else {

				const {size} = mapsByServer[server]
				const maxNativeZoom = getMapMaxZoom(size)
				const minMapZoom = Math.min(1, maxNativeZoom)

				const bounds = Leaflet.latLngBounds(
					map.unproject([0, size], maxNativeZoom),
					map.unproject([size, 0], maxNativeZoom)
				)

				// Create a new Leaflet TileLayer
				tileLayer = Leaflet.tileLayer(
					tileLayerUrl,
					{
						tileSize: MAP_TILE_SIZE,
						updateInterval: 50,
						noWrap: true,
						bounds,
						keepBuffer: 4,
						minNativeZoom: 0,
						maxNativeZoom,
						className: style.tileLayer,
						getExtension: ({z}: {z: number}): string => (
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
			}

			if (isNewServer) {
				map.fitWorld({animate: false})
			}
		}

		this.tileLayer = tileLayer
		this.server = server
	}

	// Enable or disable map interaction based on map store state changes
	private updateInteraction = (): void => {

		const {map} = this

		if (!map) {
			return
		}

		const {server} = mapStore
		const handlers = [
			map.boxZoom,
			map.doubleClickZoom,
			map.dragging,
			map.keyboard,
			map.scrollWheelZoom,
			map.tap,
			map.touchZoom
		]

		for (const handler of handlers) {

			if (!handler) {
				continue
			}

			if (server) {
				handler.enable()
			}
			else {
				handler.disable()
			}
		}
	}
}
