import React from 'react'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {mapsByServer} from '../../maps'
import {Server, servers} from '../../server'

// Select map server component
@observer export class SelectServer extends React.Component {

	public render(): React.ReactNode {

		const {server: selectedServer} = mapStore

		return (
			servers.map((server) => (
				<div key={server}>
					<label>
						<input
							type="radio"
							name="server"
							value={server}
							checked={server === selectedServer}
							onChange={this.handleServerChange}
						/>
						{mapsByServer[server].name}
					</label>
				</div>
			))
		)
	}

	// Handle server change event
	private handleServerChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		mapStore.setServer(event.target.value as Server)
	}
}
