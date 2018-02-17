import React from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'

import {mapStore} from './store'
import {SelectLayersControl} from './controls'
import style from './SelectLayers.less'

// Component for selecting map layers
@observer export class SelectLayers extends React.Component {

	public render(): React.ReactNode {

		const container = SelectLayersControl.getContainer()

		if (!mapStore.map || !container) {
			return null
		}

		return ReactDOM.createPortal(
			this.renderContent(),
			container
		)
	}

	private renderContent(): React.ReactNode {

		return (
			<div className={style.container}>TEST</div>
		)
	}
}
