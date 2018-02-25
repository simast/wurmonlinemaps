import React from 'react'

import {mapStore} from './store'
import {nameByMapType} from '../../map-type'
import {mapsByServer} from '../../maps'
import {IControlProps} from './Control'
import {SelectServer} from './SelectServer'
import {SelectType} from './SelectType'
import {SelectVersion} from './SelectVersion'
import style from './SelectLayers.less'

// Component for selecting map layers
export class SelectLayers extends React.Component<IControlProps> {

	// Render control
	public render(): React.ReactNode {

		const {expanded} = this.props

		return (
			<div className={style.container}>
				{expanded ? this.renderExpanded() : this.renderCollapsed()}
			</div>
		)
	}

	// Render collapsed control
	private renderCollapsed(): React.ReactNode {

		const {server, type, version} = mapStore

		return (
			server
				? (
					<div className={style.selection}>
						<h1>
							{mapsByServer[server].name}
							{type && <span>({nameByMapType[type]})</span>}
						</h1>
						{version && <div>{version}</div>}
					</div>
				)
				: 'Select map'
		)
	}

	// Render expanded control
	private renderExpanded(): React.ReactNode {

		return (
			<>
				<SelectServer />
				<SelectType />
				<SelectVersion />
			</>
		)
	}
}
