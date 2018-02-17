import {Cluster} from './cluster'

export enum Server {
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

// Servers list
export const servers: ReadonlyArray<Server> = Object.values(Server)

// Servers list grouped by cluster
export const serversByCluster: {
	readonly [key in Cluster]: ReadonlyArray<Server>
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
