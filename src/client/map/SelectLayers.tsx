import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {nameByMapType} from '../../map-type'
import {mapsByServer} from '../../maps'
import {SelectServer} from './SelectServer'
import {SelectType} from './SelectType'
import {SelectVersion} from './SelectVersion'
import style from './SelectLayers.less'

// Component for selecting map layers
@observer export class SelectLayers extends React.Component {

	@observable private expanded = false

	// Render control
	public render(): React.ReactNode {

		return (
			<div
				className={style.container}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{this.expanded ? this.renderExpanded() : this.renderCollapsed()}
			</div>
		)
	}

	// Render collapsed control
	private renderCollapsed(): React.ReactNode {

		const {server, type, version} = mapStore

		return (
			server
				? (
					<>
						<strong>{mapsByServer[server].name}</strong>
						{type && <div>{nameByMapType[type]}</div>}
						{version && <div>{version}</div>}
					</>
				)
				: 'Select server'
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

	// Expand control view
	@action private expand(): void {
		this.expanded = true
	}

	// Collapse control view
	@action private collapse(): void {
		this.expanded = false
	}

	// Handle mouse enter event
	private handleMouseEnter: React.MouseEventHandler<HTMLElement> = () => {
		this.expand()
	}

	// Handle mouse leave event
	private handleMouseLeave: React.MouseEventHandler<HTMLElement> = () => {
		this.collapse()
	}
}
