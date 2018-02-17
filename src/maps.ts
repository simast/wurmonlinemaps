import {Server} from './server'
import {MapType} from './map-type'

export interface IMap {
	name: string
	size: number
	versionsByType: {
		[type in MapType]?: string[]
	}
}

// All available maps
export const mapsByServer: {
	[key in Server]: IMap
} = {
	[Server.Independence]: {
		name: 'Independence',
		size: 4096,
		versionsByType: {
			[MapType.Isometric]: [
				'2012-01',
				'2015-04-18',
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
				'2011-09-07',
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
				'2011-09-15',
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
				'2012-05-31',
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
				'2012-12-12',
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
				'2012-12-18',
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
				'2015-04-18',
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
				'2007-12-17',
				'2012-01',
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
				'2011-11-01',
				'2015-04-15',
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
				'2011-11-01',
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
				'2011-11-01',
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
