
import { readFile, readdir, lstat } from 'fs/promises'
import { resolve } from 'path'

export const root = `${process.cwd()}/shared`
export const grantaccess = ['']
export function ls(absolutePath: string) {
	return readdir(absolutePath, { withFileTypes: true }).then((dirents) =>
		dirents.map((dirent) => dirent.name).filter((name) => !name.startsWith('.'))
	)
}
export function cat(absolutePath: string) {
	return readFile(absolutePath, 'utf-8')
}
export function stats(absolutePath: string) {
	return lstat(absolutePath).then((statsObj) => ({
		isFile: statsObj.isFile(),
		isDirectory: statsObj.isDirectory(),
		isSymbolicLink: statsObj.isSymbolicLink(),
		size: statsObj.size,
		mode: statsObj.mode,
		uid: statsObj.uid,
		gid: statsObj.gid,
		atime: statsObj.atimeMs,
		mtime: statsObj.mtimeMs,
		ctime: statsObj.ctimeMs,
		birthtime: statsObj.birthtimeMs
	}))
}
export function getAbsolutePath(path: string) {
	return resolve(root, path)
}
export function getIsAllowed(absolutePath: string) {
	return grantaccess.some((dir) => {
		const allowedPath = resolve(root, dir)
		return absolutePath.startsWith(allowedPath)
	})
}