export const enum Cluster {
	Freedom = 'freedom',
	Epic = 'deliverance'
}

export const enum Server {
	Affliction = 'affliction',
	Celebration = 'celebration',
	Chaos = 'chaos',
	Deliverance = 'deliverance',
	Desertion = 'desertion',
	Elevation = 'elevation',
	Exodus = 'exodus',
	Independence = 'independence',
	Pristine = 'pristine',
	Release = 'release',
	Serenity = 'serenity',
	Xanadu = 'xanadu'
}

export enum MapType {
	Terrain = 'terrain',
	Isometric = 'iso',
	Topographic = 'topo',
	Routes = 'routes'
}

// Servers list grouped by cluster
export const serversByCluster: {
	[key in Cluster]: Server[]
} = {
	[Cluster.Freedom]: [
		Server.Celebration,
		Server.Chaos,
		Server.Deliverance,
		Server.Exodus,
		Server.Independence,
		Server.Pristine,
		Server.Release,
		Server.Xanadu
	],
	[Cluster.Epic]: [
		Server.Affliction,
		Server.Desertion,
		Server.Elevation,
		Server.Serenity
	]
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
	[Server.Deliverance]: {
		name: 'Deliverance',
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
	[Server.Exodus]: {
		name: 'Exodus',
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
	[Server.Release]: {
		name: 'Release',
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
	[Server.Desertion]: {
		name: 'Desertion',
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
	}
}
