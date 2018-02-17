import React from 'react'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {Control} from './Control'
import {MapType} from '../../map-type'
import {mapsByServer} from '../../maps'
import style from './SelectLayers.less'

const mapTypeNames: {
	readonly [key in MapType]: string
} = {
	[MapType.Terrain]: 'Terrain',
	[MapType.Isometric]: 'Isometric',
	[MapType.Topographic]: 'Topographic',
	[MapType.Routes]: 'Routes'
}

// Component for selecting map layers
@observer export class SelectLayers extends Control {

	protected renderControl(): React.ReactNode {

		const {server, type} = mapStore

		return (
			<div className={style.container}>
				{
					server
						? (
							<>
								<strong>{mapsByServer[server].name}</strong>
								{type && <div>{mapTypeNames[type]}</div>}
							</>
						)
						: 'Select server'
				}
			</div>
		)
	}
}
