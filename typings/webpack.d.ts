declare module '*.less' {

	interface IModuleLocals {
		readonly [key: string]: string
	}

	const moduleLocals: IModuleLocals

	export = moduleLocals
}
