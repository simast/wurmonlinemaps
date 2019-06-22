import * as leaflet from 'leaflet'

declare module 'leaflet' {

	// tslint:disable-next-line:interface-name
	export interface TileLayerOptions {
		getExtension(coords: leaflet.Coords): string
	}
}
