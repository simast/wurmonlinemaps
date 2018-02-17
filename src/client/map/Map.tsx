import React from 'react'
import Leaflet from 'leaflet'
import {observer} from 'mobx-react'

import {STATIC_BASE_URL, MAP_TILE_SIZE} from '../../constants'
import {Server} from '../../server'
import {MapType, mapTypes} from '../../map-type'
import {mapsByServer, IMap} from '../../maps'
import {mapStore} from './store'
import {SelectLayersControl} from './controls'
import {SelectLayers} from './SelectLayers'

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
@observer export class Map extends React.Component {

	private mapElement: HTMLDivElement | null = null

	// Get max zoom level based on server map size
	private static getMaxZoom(mapSize: number): number {
		return Math.log(mapSize / MAP_TILE_SIZE) / Math.log(2)
	}

	// Get a list of available map types based on map version
	private static getMapTypesForVersion(mapData: IMap, version: string): MapType[] {
		return mapTypes.filter((type) => (mapData.versionsByType[type] || []).includes(version))
	}

	public render(): React.ReactNode {

		return (
			<div className={style.container} ref={(el) => {this.mapElement = el}}>
				<SelectLayers />
			</div>
		)
	}

	public componentDidMount() {

		const server = Server.Xanadu
		const version = '2017-12-31'
		const mapData = mapsByServer[server]

		const mapSize = mapData.size
		const maxNativeZoom = Map.getMaxZoom(mapSize)
		const minMapZoom = Math.min(2, maxNativeZoom)

		const map = Leaflet.map(this.mapElement!, {
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

		const versionMapTypes = Map.getMapTypesForVersion(mapData, version)

		// Create all available tile layers
		const tileLayers = versionMapTypes.map((mapType) => (
			this.createTileLayer(server, mapType, version, maxBounds, maxNativeZoom)
		))

		// Add layer control
		const layerControl = Leaflet.control.layers(versionMapTypes.reduce(
			(baseLayers, mapType, index) => ({
				...baseLayers,
				[mapTypeNames[mapType]]: tileLayers[index]
			}),
			{}
		))

		tileLayers[0].addTo(map)
		layerControl.addTo(map)

		map.addControl(SelectLayersControl)

		// Disable right click context menu
		map.on('contextmenu', () => undefined)

		map.fitWorld({
			animate: false
		})

		mapStore.setMap(map)
	}

	// Create a new Leaflet TileLayer
	private createTileLayer(
		server: Server,
		mapType: MapType,
		version: string,
		bounds: Leaflet.LatLngBounds,
		maxNativeZoom: number
	): Leaflet.TileLayer {

		return Leaflet.tileLayer(
			`${STATIC_BASE_URL}/${server}-${mapType}-${version}/{z}/{x}/{y}.{getExtension}`,
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
	}
}
