import {observable, action, autorun} from 'mobx'
import Leaflet from 'leaflet'
import {matchPath} from 'react-router'

import {Server} from '../../server'
import {MapType} from '../../map-type'
import {MAP_ROUTE} from '../../constants'
import {routingStore} from '../app'

class MapStore {

	// Observables
	@observable.ref public map?: Leaflet.Map
	@observable public server?: Server
	@observable public type?: MapType
	@observable public version?: string

	public constructor() {
		autorun(this.syncMapRouteWithStore)
	}

	// Actions
	@action public setMap = (map: Leaflet.Map) => this.map = map
	@action public setServer = (server?: Server) => this.server = server
	@action public setType = (type?: MapType) => this.type = type
	@action public setVersion = (version?: string) => this.version = version

	// Synchronize map store state from location pathname
	private syncMapRouteWithStore() {

		const {location} = routingStore

		if (!location) {
			return
		}

		const match = matchPath(location.pathname, {path: MAP_ROUTE})

		console.log(match) // tslint:disable-line
	}
}

export const mapStore = new MapStore()
