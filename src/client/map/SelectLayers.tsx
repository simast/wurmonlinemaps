import React from 'react'
import Leaflet from 'leaflet'

import style from './SelectLayers.less'

interface IProps {
	map: Leaflet.Map
}

// Component for selecting map layers
export class SelectLayers extends React.PureComponent<IProps> {

	public render(): React.ReactNode {

		return (
			<div className={style.container}>TEST</div>
		)
	}
}
