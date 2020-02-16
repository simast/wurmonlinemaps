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
import styles from './Map.less'

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

		const {map} = this

		return (
			<div className={styles.container} ref={(el) => {this.mapElement = el}}>
				<Control map={map} position="topright" expandable component={SelectLayers} />
				<div className={styles.vignette} />
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

			const {size, sizeByVersion} = mapsByServer[server]
			const mapSize = sizeByVersion && sizeByVersion[version] ? sizeByVersion[version] : size
			const maxNativeZoom = getMapMaxZoom(mapSize)

			if (tileLayer && maxNativeZoom !== tileLayer.options.maxNativeZoom) {
				tileLayer.remove()
				tileLayer = undefined
			}

			const tileLayerUrl = `${STATIC_BASE_URL}/${server}-${type}-${version}/{z}/{x}/{y}.{getExtension}`

			// Re-use existing tile layer
			if (tileLayer) {
				tileLayer.setUrl(tileLayerUrl)
			}
			// Create a new tile layer
			else {
				const bounds = Leaflet.latLngBounds(
					map.unproject([0, mapSize], maxNativeZoom),
					map.unproject([mapSize, 0], maxNativeZoom)
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
						className: styles.tileLayer,
						getExtension: ({z}: {z: number}): string => (
							(z < maxNativeZoom)
								? 'jpg' // Lower zoom levels use lossy JPG format
								: 'png' // Higher zoom levels use lossless PNG format
						)
					}
				)

				map.setMaxBounds(bounds)
				map.setZoom(0, {animate: false})
				map.setMaxZoom(maxNativeZoom + 2) // Allow over-zooming
				map.addLayer(tileLayer)
			}

			if (isNewServer) {

				const padding = Math.round(MAP_TILE_SIZE / 2)

				map.fitWorld({
					animate: false,
					padding: [-padding, -padding]
				})

				// Lock min zoom level
				map.setMinZoom(map.getZoom())
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
