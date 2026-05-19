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
            name: 'content',
            title: 'Pillar content (minimaal 1500 woorden)',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normaal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Vet', value: 'strong' },
                            { title: 'Cursief', value: 'em' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    { name: 'href', type: 'url', title: 'URL' },
                                ],
                            },
                        ],
                    },
                },
            ],
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
