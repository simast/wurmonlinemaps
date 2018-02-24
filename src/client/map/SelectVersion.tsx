import React from 'react'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {mapsByServer} from '../../maps'
import style from './SelectLayers.less'

// Select map version component
@observer export class SelectVersion extends React.Component {

	public render(): React.ReactNode {

		const {server, type, version: selectedVersion} = mapStore

		if (!server || !type) {
			return null
		}

		const versions = mapsByServer[server].versionsByType[type] || []

		return (
			<div className={style.selectOptions}>
				<h3>Version</h3>
				{versions.map((version) => (
					<label key={version}>
						<input
							type="radio"
							name="version"
							value={version}
							checked={version === selectedVersion}
							onChange={this.handleVersionChange}
						/>
						{version}
					</label>
				))}
			</div>
		)
	}

	// Handle map version change event
	private handleVersionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		mapStore.setVersion(event.target.value)
	}
}
