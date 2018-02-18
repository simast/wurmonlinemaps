export enum MapType {
	Terrain = 'terrain',
	Isometric = 'iso',
	Topographic = 'topo',
	Routes = 'routes'
}

export const mapTypes: ReadonlyArray<MapType> = Object.values(MapType)

export const mapTypeNames: {
	readonly [key in MapType]: string
} = {
	[MapType.Terrain]: 'Terrain',
	[MapType.Isometric]: 'Isometric',
	[MapType.Topographic]: 'Topographic',
	[MapType.Routes]: 'Routes'
}
