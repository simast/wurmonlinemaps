declare module 'mapslice' {

	import {EventEmitter} from 'events'

	interface IMapSlicerOptions {
		file: string
		output?: string
		outputFolder?: string
		tileSize?: number
		imageMagick?: boolean
		background?: string
		tmp?: string
		parallelLimit?: number
		minWidth?: number
		skipEmptyTiles?: boolean
		bitdepth?: number
		dither?: boolean
		colors?: number
		autoStart?: boolean
	}

	class MapSlicer extends EventEmitter {
		public start(): void
		public on(event: 'start', listener: (files: number) => void): this
		public on(event: 'progress', listener: (progress: number) => void): this
		public on(event: 'error', listener: (error: Error) => void): this
		public on(event: 'end', listener: () => void): this
	}

	interface IMapSlicer {
		(options: IMapSlicerOptions): MapSlicer
		new (options: IMapSlicerOptions): MapSlicer
	}

	const mapslicer: IMapSlicer

	export = mapslicer
}
