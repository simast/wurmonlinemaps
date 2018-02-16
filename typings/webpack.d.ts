declare module '*.less' {

	interface IModuleLocals {
		[key: string]: string | undefined
	}

	const moduleLocals: IModuleLocals

	export = moduleLocals
}
