/*
	This script is used to cut and compress map image files into web map tiles.

	1. Place any PNG or JPG map image files in /maps directory (at project root).
	2. Run "yarn build:maps" command to execute this script.
	3. Web map tiles will be created in /maps directory when script has completed.

	Please note that you need to install GraphicsMagick on you system for this script
	to work. Download GraphicsMagick from: http://www.graphicsmagick.org/
*/

import os from 'os'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import {execFile} from 'child_process'
import gm from 'gm'
import optipng from 'optipng-bin'
import MapSlicer from 'mapslice'

import {MAP_TILE_SIZE} from '../src/constants'
import {getMapMaxZoom} from '../src/maps'

// tslint:disable: no-console

const MAPS_DIR = 'maps'

// Get a list of map image files
const mapFiles = glob.sync(`${MAPS_DIR}/*.@(png|jpg)`, {
	nodir: true
})

const getTileFileId = (mapId: string, tileFile: string): string => (
	path.normalize(tileFile).replace(path.join(MAPS_DIR, mapId, '/'), '')
)

// Cut map image file into web map tiles
const cutMapIntoTiles = (
	mapId: string,
	mapFile: string
) => new Promise<void>(async (resolve, reject) => {

	let lastProgressPercent: number

	const mapSlicer = new MapSlicer({
		file: mapFile,
		output: path.join(MAPS_DIR, mapId, '{z}/{x}/{y}.png'),
		tileSize: MAP_TILE_SIZE,
		background: '#000000FF',
		tmp: path.join(MAPS_DIR, '.temp'),
		parallelLimit: os.cpus().length
	})

	mapSlicer.on('start', (files) => {
		console.info(`${mapId}: Starting to process ${files} files.`)
	})

	mapSlicer.on('error', reject)

	mapSlicer.on('progress', (progress) => {

		const progressPercent = Math.round(progress * 100)

		if (progressPercent !== lastProgressPercent) {
			console.info(`${mapId}: ${progressPercent}%`)
		}

		lastProgressPercent = progressPercent
	})

	mapSlicer.on('end', () => {

		console.info(`${mapId}: Finished processing all map tiles.`)
		resolve()
	})

	mapSlicer.start()
})

// Get map file maximum zoom level
const getMapFileMaxZoom = (
	mapFile: string
) => new Promise<number>(async (resolve, reject) => {

	gm(mapFile).size((error, size) => {

		if (error) {
			return reject(error)
		}

		resolve(getMapMaxZoom(size.width))
	})
})

// Convert a single low zoom PNG tile to JPG file
const convertLowZoomMapTileToJPG = (
	mapId: string,
	tileFile: string
) => new Promise<void>(async (resolve, reject) => {

	console.log(`${mapId}: Converting ${getTileFileId(mapId, tileFile)}`)

	const tileFileJPG = tileFile.replace('.png', '.jpg')

	gm(tileFile)
		.noProfile()
		.quality(75)
		.write(tileFileJPG, (error) => {

			if (error) {
				return reject(error)
			}

			fs.unlinkSync(tileFile)
			resolve()
		})
})

// Convert low zoom PNG tiles to JPG files
const convertLowZoomMapTilesToJPG = async (mapId: string, mapFile: string) => {

	const maxZoom = await getMapFileMaxZoom(mapFile)

	// Get all low zoom map tile files
	const lowZoomFiles = glob.sync(`${MAPS_DIR}/${mapId}/!(${maxZoom})/**/*.png`, {
		nodir: true
	})

	// Convert each low zoom PNG map tile
	for (const lowZoomFile of lowZoomFiles) {
		await convertLowZoomMapTileToJPG(mapId, lowZoomFile)
	}

	console.log(`${mapId}: Finished converting all low zoom PNG map tiles to JPG.`)
}

// Optimize a single PNG map tile
const optimizePNGMapTile = (
	mapId: string,
	tileFile: string
) => new Promise<void>(async (resolve, reject) => {

	console.log(`${mapId}: Optimizing ${getTileFileId(mapId, tileFile)}`)

	const args = [
		'-o5',
		'-force',
		'-strip=all',
		'-out', tileFile,
		tileFile
	]

	execFile(optipng, args, (error: Error | null) => {

		if (error) {
			return reject(error)
		}

		resolve()
	})
})

// Optimize all PNG map tiles
const optimizePNGMapTiles = async (mapId: string) => {

	// Get all PNG map tile files
	const pngFiles = glob.sync(`${MAPS_DIR}/${mapId}/**/*.png`, {
		nodir: true
	})

	// Optimize each PNG map tile
	for (const pngFile of pngFiles) {
		await optimizePNGMapTile(mapId, pngFile)
	}

	console.log(`${mapId}: Finished optimizing all PNG map tiles.`)
}

// Process map file
const processMap = async (mapFile: string) => {

	const mapId = path.basename(mapFile, path.extname(mapFile))

	await cutMapIntoTiles(mapId, mapFile)
	await convertLowZoomMapTilesToJPG(mapId, mapFile)
	await optimizePNGMapTiles(mapId)
}

(async () => {

	// Process each map file
	for (const mapFile of mapFiles) {
		await processMap(mapFile)
	}
})()
