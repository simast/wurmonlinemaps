import React from 'react'

import {mapStore} from './store'
import {nameByMapType} from '../../map-type'
import {mapsByServer} from '../../maps'
import {IControlProps} from './Control'
import {SelectServer} from './SelectServer'
import {SelectType} from './SelectType'
import {SelectVersion} from './SelectVersion'
import styles from './SelectLayers.less'

// Component for selecting map layers
export class SelectLayers extends React.Component<IControlProps> {

	// Render control
	public render(): React.ReactNode {

		const {expanded} = this.props

		return (
			<div className={styles.container}>
				{expanded ? this.renderExpanded() : this.renderCollapsed()}
			</div>
		)
	}

	// Render collapsed control
	private renderCollapsed(): React.ReactNode {

		const {server, type} = mapStore
		const mapData = server && mapsByServer[server]

		return (
			mapData
				? (
					<div className={mapData.hasPvP ? styles.selectedWithPVP : styles.selected}>
						<h1>{mapData.name}</h1>
						{type && <span>{nameByMapType[type]}</span>}
					</div>
				)
				: (
					<div className={styles.noSelection}>
						Select map
					</div>
				)
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
