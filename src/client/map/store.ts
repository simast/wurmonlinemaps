import {observable, autorun, runInAction} from 'mobx'
import {matchPath} from 'react-router'

import {Server, servers} from '../../server'
import {MapType, mapTypes} from '../../map-type'
import {mapsByServer, mapTypesByServer} from '../../maps'
import {MAP_ROUTE} from '../../constants'
import {routingStore} from '../app'

export interface IMapRouteParams {
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
		autorun(this.syncMapRouteWithStore.bind(this))
	}

	// Synchronize map store state from location pathname
	private syncMapRouteWithStore() {

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
}

export const mapStore = new MapStore()
