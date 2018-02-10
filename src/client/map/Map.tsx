import React from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import style from './Map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

// Map component wrapping a Mapbox GL map
export class Map extends React.PureComponent {

	private mapElement: HTMLDivElement | null = null
	// @ts-ignore
	private map?: mapboxgl.Map

	public render(): React.ReactNode {

		return (
			<div
				className={style.base}
				ref={(element) => {this.mapElement = element}}
			/>
		)
	}

	public componentDidMount() {

		// Initialize Mapbox GL map
		this.map = new mapboxgl.Map({
			container: this.mapElement!,
			style: 'mapbox://styles/mapbox/streets-v9'
		})
	}
}
