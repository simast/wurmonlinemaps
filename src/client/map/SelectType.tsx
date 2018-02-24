import React from 'react'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {MapType, nameByMapType} from '../../map-type'
import {mapTypesByServer} from '../../maps'
import style from './SelectLayers.less'

// Select map type component
@observer export class SelectType extends React.Component {

	public render(): React.ReactNode {

		const {server, type: selectedType} = mapStore

		if (!server) {
			return null
		}

		return (
			<div className={style.selectOptions}>
				<h3>Type</h3>
				{mapTypesByServer[server].map((type) => (
					<label key={type}>
						<input
							type="radio"
							name="type"
							value={type}
							checked={type === selectedType}
							onChange={this.handleTypeChange}
						/>
						{nameByMapType[type]}
					</label>
				))}
			</div>
		)
	}

	// Handle map type change event
	private handleTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		mapStore.setType(event.target.value as MapType)
	}
}
