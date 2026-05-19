import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pillarPage',
    title: 'Pillarpage',
    type: 'document',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            description: 'Moet overeenkomen met de URL. Bijv: vakantie-met-kids of vakantie-nederland-met-kids',
            options: { source: 'title' },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Paginatitel',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'label',
            title: 'Label (boven de titel)',
            type: 'string',
            description: 'Bijv: "Bestemmingen" of "Vakantie voor Kids"',
        }),
        defineField({
            name: 'intro',
            title: 'Intro (kort, onder de titel)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'contentHtml',
            title: 'Pillar content HTML (minimaal 1500 woorden)',
            description: 'Plak hier de HTML die door AI is gegenereerd. Gebruik <h2>, <h3>, <p>, <strong> tags.',
            type: 'text',
            rows: 30,
        }),
        defineField({
            name: 'metaDescription',
            title: 'SEO Meta Description',
            type: 'text',
            rows: 2,
        }),
    ],
    preview: {
        select: { title: 'title', slug: 'slug.current' },
        prepare({ title, slug }) {
            return { title, subtitle: `/${slug}` }
        },
    },
})
