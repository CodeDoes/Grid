import type { PageLoad } from './$types'

export const load = (async ({ params, fetch }) => {
	let { path } = params
	path = path ? path : 'test.txt'
	// debugger
	const files = await fetch('./api/fs?ls').then((r) => r.json())
	const file = await fetch(`./api/fs/${path}?cat`).then((r) => r.text())
	console.log(files)
	return { files, file, path }
}) satisfies PageLoad
