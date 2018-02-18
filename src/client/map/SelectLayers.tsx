import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import {history} from '../app'
import {mapStore, IMapRouteParams} from './store'
import {Control} from './Control'
import {MapType, mapTypes, mapTypeNames} from '../../map-type'
import {mapsByServer, mapTypesByServer} from '../../maps'
import {Server, servers} from '../../server'
import style from './SelectLayers.less'

// Component for selecting map layers
@observer export class SelectLayers extends Control {

	@observable private expanded = false

	// Render control content
	protected renderControl(): React.ReactNode {

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

	// Render collapsed control view
	private renderCollapsed(): React.ReactNode {

		const {server, type, version} = mapStore

		return (
			server
				? (
					<>
						<strong>{mapsByServer[server].name}</strong>
						{type && <div>{mapTypeNames[type]}</div>}
						{version && <div>{version}</div>}
					</>
				)
				: 'Select server'
		)
	}

	// Render expanded control view
	private renderExpanded(): React.ReactNode {

		return (
			<>
				{this.renderServers()}
				{this.renderTypes()}
				{this.renderVersions()}
			</>
		)
	}

	// Render servers selection
	private renderServers(): React.ReactNode {

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

	// Render map types selection
	private renderTypes(): React.ReactNode {

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

	// Render map versions selection
	private renderVersions(): React.ReactNode {

		const {server, type, version: selectedVersion} = mapStore

		if (!server || !type) {
			return null
		}

		const versions = mapsByServer[server].versionsByType[type] || []

		return (
			<>
				<hr />
				{versions.map((version) => (
					<div key={version}>
						<label>
							<input
								type="radio"
								name="version"
								value={version}
								checked={version === selectedVersion}
								onChange={this.handleVersionChange}
							/>
							{version}
						</label>
					</div>
				))}
			</>
		)
	}

	// Expand control view
	@action private expand() {
		this.expanded = true
	}

	// Collapse control view
	@action private collapse() {
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

	// Handle server change event
	private handleServerChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		this.changeRouteUrl({server: event.target.value as Server})
	}

	// Handle map type change event
	private handleTypeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		this.changeRouteUrl({type: event.target.value as MapType})
	}

	// Handle map version change event
	private handleVersionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		this.changeRouteUrl({version: event.target.value})
	}

	// Change map route URL based on new layer selection values
	private changeRouteUrl({
		server = mapStore.server!,
		type = mapStore.type,
		version = mapStore.version
	}: IMapRouteParams) {

		const versions = mapsByServer[server].versionsByType[type!] || []

		version = version !== versions[0] ? version : undefined
		type = type !== mapTypes[0] || version ? type : undefined

		const route = [server, type, version].filter(Boolean).join('/')

		history.push(`/${route}`)
	}
}
