import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './src/schemas/post'
import pillarPage from './src/schemas/pillarPage'
import park from './src/schemas/park'

export default defineConfig({
    projectId: '7oxpyma4',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: [post, pillarPage, park],
    },
})
