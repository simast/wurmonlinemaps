import React from 'react'
import Leaflet from 'leaflet'

import {STATIC_BASE_URL, TILE_SIZE} from '../../constants'
import {Server, MapType, mapDataByServer, IMapData} from '../../maps'
import {SelectLayersControl} from './controls'

import 'leaflet/dist/leaflet.css'
import style from './Map.less'

const mapTypeNames: {
	[key in MapType]: string
} = {
	[MapType.Terrain]: 'Terrain',
	[MapType.Isometric]: 'Isometric',
	[MapType.Topographic]: 'Topographic',
	[MapType.Routes]: 'Routes'
}

// Map component wrapping a Leaflet map instance
export class Map extends React.PureComponent {

	private mapElement: HTMLDivElement | null = null
	private map?: Leaflet.Map

	// Get max zoom level based on server map size
	private static getMaxZoom(mapSize: number): number {
		return Math.log(mapSize / TILE_SIZE) / Math.log(2)
	}

	// Get a list of available map types based on map version
	private static getMapTypesForVersion(mapData: IMapData, version: string): MapType[] {

		return (Object.values(MapType) as MapType[])
			.filter((mapType) => (mapData.versionsByType[mapType] || []).indexOf(version) !== -1)
	}

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
		const version = '2017-12-31'
		const mapData = mapDataByServer[server]

		const mapSize = mapData.size
		const maxNativeZoom = Map.getMaxZoom(mapSize)
		const minMapZoom = Math.min(2, maxNativeZoom)

		const map = this.map = Leaflet.map(this.mapElement!, {
			crs: Leaflet.CRS.Simple,
			attributionControl: false,
			zoomControl: false,
			minZoom: minMapZoom,
			maxZoom: maxNativeZoom + 2, // Allow over-zooming
			zoom: minMapZoom,
			maxBoundsViscosity: 0.5
		})

		const maxBounds = Leaflet.latLngBounds(
			map.unproject([0, mapSize], maxNativeZoom),
			map.unproject([mapSize, 0], maxNativeZoom)
		)

		map.setMaxBounds(maxBounds)

		const mapTypes = Map.getMapTypesForVersion(mapData, version)

		// Create all available tile layers
		const tileLayers = mapTypes.map((mapType) => (
			this.createTileLayer(server, mapType, version, maxBounds, maxNativeZoom)
		))

		// Add layer control
		const layerControl = Leaflet.control.layers(mapTypes.reduce(
			(baseLayers, mapType, index) => ({
				...baseLayers,
				[mapTypeNames[mapType]]: tileLayers[index]
			}),
			{}
		))

		tileLayers[0].addTo(map)
		layerControl.addTo(map)

		map.addControl(new SelectLayersControl())

		// Disable right click context menu
		map.on('contextmenu', () => undefined)

		map.fitWorld({
			animate: false
		})
	}

	// Create a new Leaflet TileLayer
	private createTileLayer(
		server: Server,
		mapType: MapType,
		version: string,
		bounds: Leaflet.LatLngBounds,
		maxNativeZoom: number
	): Leaflet.TileLayer {

		const {map} = this

		if (!map) {
			throw new Error('Leaflet map instance is not initialized!')
		}

		return Leaflet.tileLayer(
			`${STATIC_BASE_URL}/${server}-${mapType}-${version}/{z}/{x}/{y}.{getExtension}`,
			{
				tileSize: TILE_SIZE,
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
	}
}
