export enum MapType {
	Terrain = 'terrain',
	Isometric = 'iso',
	Topographic = 'topo',
	Routes = 'routes'
}

export const mapTypes: ReadonlyArray<MapType> = Object.values(MapType)
