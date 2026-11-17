# 文件系统

## 基础

```ts
import fs from 'node:fs/promises'
const tempDir = path.resolve(process.cwd(), 'temp')
const creatDir = async (pathStr: string) => {
	return await fs.mkdir(path.resolve(tempDir, pathStr))
}
```

### 写入文件

```ts
const createFile = async (filename: string) => {
	const dir = path.join(tempDir, 'logs')
	const filepath = path.join(dir, filename)
	// 确保文件夹存在
	await fs.mkdir(dir, { recursive: true })
	// 写入内容
	await fs.writeFile(filepath, 'Hello NodeJS\n', { encoding: 'utf-8' })
	// 追加内容
	await fs.appendFile(filepath, `time: ${new Date().toISOString()}`, {
		encoding: 'utf-8',
	})
}
```

### 实践

#### 安全创建

```ts
const createFileIfNotExists = async (filepath: string, content: string) => {
	try {
		await fs.writeFile(path.resolve(tempDir, filepath), content, { flag: 'wx' }) // wx 已存在，文件报错
	} catch (error: unknown) {
		if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
			console.log('file already exists')
			return false
		}
		throw error
	}
}
```

#### 原子写入

```ts
const atomicWrite = async (filepath: string, data: string | Buffer) => {
	const dir = path.dirname(filepath)
	const tempDir = path.join(dir, `.tmp-${randomBytes(8).toString('hex')}`)
	try {
		await fs.writeFile(tempDir, data, 'utf-8')
		await fs.rename(tempDir, filepath)
	} catch (err) {
		try {
			// 清理临时文件
			await import('node:fs/promises').then((fs) => fs.unlink(tempDir))
		} catch (error) {}
		console.log(err)
	}
}
```

