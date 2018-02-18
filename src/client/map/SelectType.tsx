import React from 'react'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {MapType, mapTypeNames} from '../../map-type'
import {mapTypesByServer} from '../../maps'

// Select map type component
@observer export class SelectType extends React.Component {

	public render(): React.ReactNode {

		const {server, type: selectedType} = mapStore

		if (!server) {
			return null
		}

		return (
			<>
				<hr />
				{mapTypesByServer[server].map((type) => (
					<div key={type}>
						<label>
							<input
								type="radio"
								name="type"
								value={type}
								checked={type === selectedType}
								onChange={this.handleTypeChange}
							/>
							{mapTypeNames[type]}
						</label>
					</div>
				))}
			</>
		)
	}

	// Handle map type change event
	private handleTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		mapStore.setType(event.target.value as MapType)
	}
}
