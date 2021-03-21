import {Server, servers} from './server'
import {MapType, mapTypes} from './map-type'
import {MAP_TILE_SIZE} from './constants'

interface IMap {
	readonly name: string
	readonly size: number
	readonly sizeByVersion?: {
		readonly [version: string]: number
	}
	readonly hasPvP: boolean
	readonly versionsByType: {
		readonly [type in MapType]?: ReadonlyArray<string>
	}
}

// All available maps
export const mapsByServer: {
	readonly [key in Server]: IMap
} = {
	[Server.Independence]: {
		name: 'Independence',
		size: 4096,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2015-04-18',
				'2012-01'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Deliverance]: {
		name: 'Deliverance',
		size: 2048,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2011-09-07'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Exodus]: {
		name: 'Exodus',
		size: 2048,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2011-09-15'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Celebration]: {
		name: 'Celebration',
		size: 2048,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2012-05-31'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Pristine]: {
		name: 'Pristine',
		size: 2048,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2012-12-12'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Release]: {
		name: 'Release',
		size: 2048,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2012-12-18'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Xanadu]: {
		name: 'Xanadu',
		size: 8192,
		hasPvP: false,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2015-04-18'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Routes]: [
				'2020-01-11',
				'2017-12-31'
			]
		}
	},
	[Server.Chaos]: {
		name: 'Chaos',
		size: 4096,
		hasPvP: true,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2012-01',
				'2007-12-17'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			]
		}
	},
	[Server.Elevation]: {
		name: 'Elevation',
		size: 4096,
		sizeByVersion: {
			'2020-01-11': 2048
		},
		hasPvP: true,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2015-04-15'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			]
		}
	},
	[Server.Desertion]: {
		name: 'Desertion',
		size: 2048,
		hasPvP: true,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2011-11-01'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			]
		}
	},
	[Server.Affliction]: {
		name: 'Affliction',
		size: 2048,
		hasPvP: true,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			]
		}
	},
	[Server.Serenity]: {
		name: 'Serenity',
		size: 2048,
		hasPvP: true,
		versionsByType: {
			[MapType.Isometric]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01',
				'2011-11-01'
			],
			[MapType.Terrain]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			],
			[MapType.Topographic]: [
				'2021-01-09',
				'2020-01-11',
				'2019-01-01',
				'2017-12-31',
				'2017-08-13',
				'2016-11-01'
			]
		}
	}
}

// Available map types by server
export const mapTypesByServer: {
	readonly [key in Server]: ReadonlyArray<MapType>
} = servers.reduce(
	(result, server) => Object.assign(result, {
		[server]: mapTypes.filter(
			(type) => (mapsByServer[server].versionsByType[type] || []).length > 0
		)
	}),
	{
		[Server.Independence]: [],
		[Server.Deliverance]: [],
		[Server.Exodus]: [],
		[Server.Celebration]: [],
		[Server.Pristine]: [],
		[Server.Release]: [],
		[Server.Xanadu]: [],
		[Server.Chaos]: [],
		[Server.Elevation]: [],
		[Server.Desertion]: [],
		[Server.Affliction]: [],
		[Server.Serenity]: []
	}
)

// Get max zoom level based on server map size
export const getMapMaxZoom = (mapSize: number): number => (
	Math.log(mapSize / MAP_TILE_SIZE) / Math.log(2)
)
