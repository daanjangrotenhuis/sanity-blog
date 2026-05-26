import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations, defineDocuments } from 'sanity/presentation'
import { PreviewPane } from './src/studio/PreviewPane'
import post from './src/schemas/post'
import pillarPage from './src/schemas/pillarPage'
import park from './src/schemas/park'

const previewOrigin = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://www.vakantievoorkids.nl'

const PREVIEW_TYPES = ['post', 'pillarPage', 'park']

export default defineConfig({
    projectId: 'sg6a2naq',
    dataset: 'production',
    plugins: [
        structureTool({
            defaultDocumentNode: (S, { schemaType }) => {
                if (!PREVIEW_TYPES.includes(schemaType)) return S.document()
                return S.document().views([
                    S.view.form().title('Bewerken'),
                    S.view.component(PreviewPane).options({ schemaType }).title('Preview'),
                ])
            },
        }),
        presentationTool({
            previewUrl: { origin: previewOrigin },
            resolve: {
                mainDocuments: defineDocuments([
                    {
                        route: '/blog/:slug',
                        filter: `_type == "post" && slug.current == $slug`,
                    },
                    {
                        route: '/:slug',
                        filter: `_type == "pillarPage" && slug.current == $slug`,
                    },
                    {
                        route: '/overnachten/ontdekken/:slug',
                        filter: `_type == "park" && slug.current == $slug`,
                    },
                ]),
                locations: {
                    post: defineLocations({
                        select: { title: 'title', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [{ title: doc?.title ?? 'Blog', href: `/blog/${doc?.slug}` }],
                        }),
                    }),
                    pillarPage: defineLocations({
                        select: { title: 'title', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [{ title: doc?.title ?? 'Pagina', href: `/${doc?.slug}` }],
                        }),
                    }),
                    park: defineLocations({
                        select: { name: 'name', slug: 'slug.current' },
                        resolve: (doc) => ({
                            locations: [{ title: doc?.name ?? 'Park', href: `/overnachten/ontdekken/${doc?.slug}` }],
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
