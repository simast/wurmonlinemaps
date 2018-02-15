import React from 'react'
import Leaflet from 'leaflet'

import {STATIC_BASE_URL, TILE_SIZE} from '../../constants'
import {Server, MapType, mapDataByServer} from '../../maps'

import 'leaflet/dist/leaflet.css'
import style from './Map.css'

// Get max zoom level based on server map size
const getMaxZoom = (size: number): number => (
	Math.log(size / TILE_SIZE) / Math.log(2)
)

// Map component wrapping a Leaflet map instance
export class Map extends React.PureComponent {

	private mapElement: HTMLDivElement | null = null

	public render(): React.ReactNode {

		return (
			<div
				className={style.container}
				ref={(element) => {this.mapElement = element}}
			/>
		)
	}

	public componentDidMount() {

		const server = Server.Xanadu
		const mapType = MapType.Terrain
		const version = '2017-12-31'
		const {size} = mapDataByServer[server]

		const mapSize = size
		const maxMapZoom = getMaxZoom(size)
		const minMapZoom = Math.min(2, maxMapZoom)

		const map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			minZoom: minMapZoom,
			maxZoom: maxMapZoom + 2, // Allow over-zooming
			zoom: minMapZoom,
			maxBoundsViscosity: 0.5
		})

		const maxBounds = Leaflet.latLngBounds(
			map.unproject([0, mapSize], maxMapZoom),
			map.unproject([mapSize, 0], maxMapZoom)
		)

		map.setMaxBounds(maxBounds)

		const baseTileLayer = Leaflet.tileLayer(
			`${STATIC_BASE_URL}/${server}-${mapType}-${version}/{z}/{x}/{y}.{getExtension}`,
			{
				tileSize: TILE_SIZE,
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

		map.fitWorld({
			animate: false
		})
	}
}
