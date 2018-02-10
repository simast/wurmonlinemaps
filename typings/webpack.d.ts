declare module '*.css' {

	interface IModuleLocals {
		[key: string]: string | undefined
	}

	const moduleLocals: IModuleLocals

	export = moduleLocals
}
