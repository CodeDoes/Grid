import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import * as fs from '$lib/server/fs'

export const GET = (async ({ params, url }) => {
	console.log({"FS":{url}})
	let { path } = params
	const { ls, cat, stats } = Object.fromEntries(url.searchParams.entries())
	const absolutePath = fs.getAbsolutePath(path)

	console.log({ absolutePath, ls, cat, stats })

	// Check if the absolute path is inside the `grantaccess` directories

	if (!fs.getIsAllowed(absolutePath)) {
		throw error(403, 'Access denied')
	}

	// If the `ls` query parameter is present, return the contents of the directory at the specified path
	if (ls !== undefined) {
		try {
			return json(await fs.ls(absolutePath))
		} catch (err) {
			throw error(404, 'Directory not found')
		}
	}

	// If the `cat` query parameter is present, return the contents of the file at the specified path
	if (cat !== undefined) {
		try {
			return new Response(await fs.cat(absolutePath))
		} catch (err) {
			throw error(404, 'File not found')
		}
	}

	// If the `stats` query parameter is present, return information about the file system object at the specified path
	if (stats !== undefined) {
		try {
			return json(await fs.stats(absolutePath))
		} catch (err) {
			throw error(404, 'File system object not found')
		}
	}
	throw error(400, 'Invalid request')
}) satisfies RequestHandler
