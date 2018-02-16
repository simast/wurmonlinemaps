export const enum Server {
	// Freedom
	Independence = 'independence',
	Deliverance = 'deliverance',
	Exodus = 'exodus',
	Celebration = 'celebration',
	Pristine = 'pristine',
	Release = 'release',
	Xanadu = 'xanadu',
	Chaos = 'chaos',
	// Epic
	Elevation = 'elevation',
	Desertion = 'desertion',
	Affliction = 'affliction',
	Serenity = 'serenity'
}

export enum MapType {
	Terrain = 'terrain',
	Isometric = 'iso',
	Topographic = 'topo',
	Routes = 'routes'
}

export interface IMapData {
	name: string
	size: number
	versionsByType: {
		[type in MapType]?: string[]
	}
}

// Map data
export const mapDataByServer: {
	[key in Server]: IMapData
} = {
	[Server.Independence]: {
		name: 'Independence',
		size: 4096,
		versionsByType: {}
	},
	[Server.Deliverance]: {
		name: 'Deliverance',
		size: 2048,
		versionsByType: {}
	},
	[Server.Exodus]: {
		name: 'Exodus',
		size: 2048,
		versionsByType: {}
	},
	[Server.Celebration]: {
		name: 'Celebration',
		size: 2048,
		versionsByType: {
			[MapType.Isometric]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Terrain]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Topographic]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Routes]: [
				'2017-12-31'
			]
		}
	},
	[Server.Pristine]: {
		name: 'Pristine',
		size: 2048,
		versionsByType: {}
	},
	[Server.Release]: {
		name: 'Release',
		size: 2048,
		versionsByType: {}
	},
	[Server.Xanadu]: {
		name: 'Xanadu',
		size: 8192,
		versionsByType: {
			[MapType.Isometric]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Terrain]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Topographic]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Routes]: [
				'2017-12-31'
			]
		}
	},
	[Server.Chaos]: {
		name: 'Chaos',
		size: 4096,
		versionsByType: {
			[MapType.Isometric]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Terrain]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Topographic]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			]
		}
	},
	[Server.Elevation]: {
		name: 'Elevation',
		size: 4096,
		versionsByType: {}
	},
	[Server.Desertion]: {
		name: 'Desertion',
		size: 2048,
		versionsByType: {}
	},
	[Server.Affliction]: {
		name: 'Affliction',
		size: 2048,
		versionsByType: {
			[MapType.Isometric]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Terrain]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			],
			[MapType.Topographic]: [
				'2016-11-01',
				'2017-08-13',
				'2017-12-31'
			]
		}
	},
	[Server.Serenity]: {
		name: 'Serenity',
		size: 2048,
		versionsByType: {}
	}
}
