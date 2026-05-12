import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './src/schemas/post'

export default defineConfig({
    projectId: '7oxpyma4',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: [post],
    },
})