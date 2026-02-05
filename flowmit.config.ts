import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'flowmit'

export default defineConfig({
  scopes: readdirSync(join(fileURLToPath(new URL('.', import.meta.url)), 'packages')),
})
