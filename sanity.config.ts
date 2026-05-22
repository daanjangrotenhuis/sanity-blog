import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import post from './src/schemas/post'
import pillarPage from './src/schemas/pillarPage'
import park from './src/schemas/park'

const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:4321'

export default defineConfig({
    projectId: '7oxpyma4',
    dataset: 'production',
    plugins: [
        structureTool(),
        presentationTool({
            previewUrl: { origin: previewOrigin },
            resolve: {
                locations: {
                    post: defineLocations({
                        select: { title: 'title', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [
                                { title: doc?.title ?? 'Blog', href: `/blog/${doc?.slug}` },
                            ],
                        }),
                    }),
                    pillarPage: defineLocations({
                        select: { title: 'title', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [
                                { title: doc?.title ?? 'Pagina', href: `/${doc?.slug}` },
                            ],
                        }),
                    }),
                    park: defineLocations({
                        select: { name: 'name', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [
                                { title: doc?.name ?? 'Park', href: `/overnachten/ontdekken/${doc?.slug}` },
                            ],
                        }),
                    }),
                },
            },
        }),
    ],
    schema: {
        types: [post, pillarPage, park],
    },
})