import {observable, autorun, runInAction} from 'mobx'
import {matchPath} from 'react-router'

import {Server, servers} from '../../server'
import {MapType, mapTypes} from '../../map-type'
import {mapsByServer, mapTypesByServer} from '../../maps'
import {MAP_ROUTE} from '../../constants'
import {history, routingStore} from '../app'

interface IMapRouteParams {
	readonly server?: Server
	readonly type?: MapType
	readonly version?: string
}

class MapStore {

	// Observables
	@observable public server?: Server
	@observable public type?: MapType
	@observable public version?: string

	public constructor() {
		autorun(this.syncRouteWithStore)
	}

	public setServer(server: Server) {
		this.changeRouteUrl({server})
	}

	public setType(type: MapType) {
		this.changeRouteUrl({type})
	}

	public setVersion(version: string) {
		this.changeRouteUrl({version})
	}

	// Synchronize map store state from route URL
	private syncRouteWithStore = () => {

		const {location} = routingStore

		if (!location) {
			return
		}

		const match = matchPath<IMapRouteParams>(location.pathname, {path: MAP_ROUTE})

		if (!match) {
			return
		}

		let {server, type, version} = match.params

		// Should be a valid server type
		if (server && !servers.includes(server)) {
			server = undefined
		}

		// Should be a valid map type
		if (type && !mapTypes.includes(type)) {
			type = undefined
		}

		version = version || undefined

		// Validate hierarchical map data
		if (server) {

			const validMapTypes = mapTypesByServer[server]

			// Set type to default
			if (!type || !validMapTypes.includes(type)) {
				type = validMapTypes[0]
			}

			const validVersions = mapsByServer[server].versionsByType[type] || []

			// Set version to default
			if (!version || !validVersions.includes(version)) {
				version = validVersions[0]
			}
		}
		else {
			type = version = undefined
		}

		// Update map state
		runInAction(() => {
			this.server = server
			this.type = type
			this.version = version
		})
	}

	// Change map route URL and (indirectly) update store state
	private changeRouteUrl({
		server = this.server,
		type = this.type,
		version = this.version
	}: IMapRouteParams = {}) {

		if (server && type) {

			const validVersions = mapsByServer[server].versionsByType[type] || []

			// Ignore default or invalid version
			if (version === validVersions[0] || !validVersions.includes(version)) {
				version = undefined
			}

			const validTypes = mapTypesByServer[server]

			// Ignore default or invalid type
			if (!version && (type === mapTypes[0] || !validTypes.includes(type))) {
				type = undefined
			}
		}
		else {
			type = version = undefined
		}

		const routePath = [server, type, version].filter(Boolean).join('/')

		history.push(`/${routePath}`)
	}
}

export const mapStore = new MapStore()
